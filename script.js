function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Modal functionality
const modal = document.getElementById('contactModal');
const closeBtn = document.getElementsByClassName('close')[0];

function openContactForm() {
    modal.style.display = 'block';
}

// Close modal when clicking the X button
closeBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Image Modal Functions
function openModal(imgSrc) {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  modal.style.display = 'block';
  modalImg.src = imgSrc;

  // Close modal when clicking outside the image
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Add keyboard support for closing modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

function handleSubmit(event) {
  event.preventDefault();
  
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Show loading state
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  // Add email to the template parameters
  emailjs.send("service_s261vnq", "template_ably8yq", {
    from_name: name,
    from_email: email,  // Add this line
    reply_to: email,    // Keep this as well for reply functionality
    message: message,
    to_name: "Errol",   // Optional: add your name as recipient
  }).then(
    function(response) {
      console.log("SUCCESS", response);
      alert("Message sent successfully!");
      modal.style.display = 'none';
      document.getElementById('contactForm').reset();
    },
    function(error) {
      console.log("FAILED", error);
      alert("Failed to send message. Please try again.");
    }
  ).finally(() => {
    submitBtn.textContent = 'Send Message';
    submitBtn.disabled = false;
  });
}