import classes from "./newsletter-registration.module.css";
import { useContext, useRef } from "react";
import NotificationContext from "../../store/notification-context";

function NewsletterRegistration() {
  const enteredEmailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const inputEmail = enteredEmailRef.current.value;

    notificationCtx.showNotification({
      title: "Signup...",
      message: "Registering for newsletter..",
      status: "pending",
    });

    if (inputEmail === "") {
      alert("Invalid Email");
    }

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: inputEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        return r.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) => {
        notificationCtx.showNotification({
          title: "Success",
          message: "Successfully registered for newsletter!",
          status: "success",
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message + "Something went wrong!",
          status: "error",
        });
      });

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            ref={enteredEmailRef}
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
