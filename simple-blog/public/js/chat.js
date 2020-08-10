const socket = io();

// Elements
const messageForm = document.querySelector('#message-form');
const messageFormInput = messageForm.querySelector('input');
const locationCta = document.querySelector('#location-cta');
const messageFormButton = messageForm.querySelector('button');
const messages = document.querySelector('#messages');
const sidebar = document.querySelector('#sidebar');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Handling autoscrolling
const autoscroll = () => {
  // new message element
  const newMessage = messages.lastElementChild;

  // get the height of the newMessage
  const newMessageStyles = getComputedStyle(newMessage);
  const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  const newMessageHeight = newMessage.offsetHeight + newMessageMargin;

  // get the visible height
  const visibleHeight = messages.offsetHeight;

  // get the message container height
  const contentHeight = messages.scrollHeight;

  // Current scroll location
  const scrollOffset = messages.scrollTop + visibleHeight;

  // conditional logic for whether to autoscroll or not
  /* this tests if the the current scroll position of scrollOffset
          is at the bottom of the content height meaning we would want 
          to autoscroll to see the new message 
        if it is not at the bottom of the contentheight we do no want
          to autoscroll as the user may be looking at the history
     */
  if (contentHeight - newMessageHeight <= scrollOffset) {
    // this will set the scroll top position to the maximum scroll top value being the bottom of the page
    messages.scrollTop = messages.scrollHeight;
  }
};

// Socket event for when a user wishes to send a messsage to other users
socket.on('message', message => {
  /* console.log(message); */

  const html = Mustache.render(messageTemplate, {
    username: message.username,
    message: message.text,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

// Socket event for when a user wishes to send their location
socket.on('locationMessage', message => {
  // Create the html for the mustache template for sending the location
  const html = Mustache.render(locationMessageTemplate, {
    username: message.username,
    location: message.locationUrl,
    createdAt: moment(message.createdAt).format('h:mm a'),
  });
  messages.insertAdjacentHTML('beforeend', html);
  autoscroll();
});

socket.on('roomData', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users,
  });

  sidebar.innerHTML = html;
});

// The text form for creating and sending messages
messageForm.addEventListener('submit', e => {
  e.preventDefault();

  messageFormButton.setAttribute('disabled', 'disabled');

  const message = e.target.elements.message.value;
  // Socket event for when a user sends a message to the server
  socket.emit('sendMessage', message, err => {
    // The event acknowledgement and error handling
    messageFormButton.removeAttribute('disabled');
    messageFormInput.value = '';
    messageFormInput.focus();
    if (err) {
      return console.log(err);
    }

    console.log('Delivered');
  });
});

// The button for sending the users current location
locationCta.addEventListener('click', () => {
  // Message for users who do no have the geolocation available in their browser
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.');
  }

  locationCta.setAttribute('disabled', 'disabled');
  // Getting the user location when the button is clicked
  navigator.geolocation.getCurrentPosition(position => {
    /* console.log(position); */
    const location = {
      lat: position.coords.latitude,
      long: position.coords.longitude,
    };

    // Socket even for sending the user location to the server
    socket.emit('sendLocation', location, err => {
      // Event acknowledgement and error handling
      locationCta.removeAttribute('disabled');
      console.log(err);
    });
  });
});

socket.emit('join', { username, room }, err => {
  if (err) {
    alert(err);
    location.href = '/';
  }
});
