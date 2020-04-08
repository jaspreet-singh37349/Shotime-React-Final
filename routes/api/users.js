const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


const User = require('../../models/User');


router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

router.post('/test', (req, res)=>{
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save()
  .then(user => res.json(user))
  .catch(err => console.log(err));
})

router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      newUser.anime.unshift(null);
      newUser.movie.unshift(null);
      newUser.tvshow.unshift(null);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  }).catch(e=>{
    console.log(e)
  });
});


router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

router.patch(
  '/addAnime',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    try{
      if (user.anime.some(e => e.animeId === req.body.idd)) {
        res.json("error")
      }
    }
    catch(e){
      user.anime.unshift({animeId:req.body.idd,title:req.body.title,image:req.body.image});
      user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  }
);
router.patch(
  '/addMovie',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    try{
      if (user.movie.some(e => e.movieId === req.body.idd)) {
        res.json("error")
      }
    }
    catch(e){
      user.movie.unshift({movieId:req.body.idd,title:req.body.title,image:req.body.image});
      user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  }
);
router.patch(
  '/addTVshow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    try{
      if (user.tvshow.some(e => e.tvId === req.body.idd)) {
        res.json("error")
      }
    }
    catch(e){
      user.tvshow.unshift({tvId:req.body.idd,title:req.body.title,image:req.body.image});
      user.save()
        .then(user => res.json(user))
        .catch(err => console.log(err));
    }
  }
);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

router.get(
  '/getanime',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    res.json(user.anime);
  }
);
router.get(
  '/getmovie',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    res.json(user.movie);
  }
);
router.get(
  '/gettvshow',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    user = req.user;
    res.json(user.tvshow);
  }
);

router.patch('/users/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
  } catch (e) {
      res.status(400).send(e)
  }
})

router.delete('/users/me', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      await req.user.remove()
      res.send(req.user)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router;
