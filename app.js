const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/login', function (req, res) {
    res.send('Log In as User')
  })

  app.get('/landing_page', function (req, res) {
    res.send('Buksu Guidance')
  })

  app.get('/announcement', function (req, res) {
    res.send('Announcement')
  })

  app.get('/contact', function (req, res) {
    res.send('Contact Us')
  })

  app.post('/contact/message', function (req, res) {
    res.send('Send Message')
  })

  app.get('/user_homepage', function (req, res) {
    res.send('Scheduling')
  })

  app.post('/user_homepage/confirm', function (req, res) {
    res.send('Scheduling Confirm')
  })

  app.get('/user_history', function (req, res) {
    res.send('History Records of User')
  })

  app.get('/user_status', function (req, res) {
    res.send('Waiting for approval')
  })

  app.put('/user_status/edit', function (req, res) {
    res.send('Update Appointment')
  })

  app.delete('/user_status/delete', function (req, res) {
    res.send('Delete Appointment')
  })

  app.get('/user_profile', function (req, res) {
    res.send('User Profile')
  })

  app.patch('/user_profile/edit', function (req, res) {
    res.send('Update User Profile')
  })

  app.post('/user_status/edit', function (req, res) {
    res.send('Update Appointment')
  })


app.listen(3000)