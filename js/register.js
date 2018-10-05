/* Set up our service worker for the project */
if ("serviceworker" in navigator) {
  navigator.serviceworker
    .register("sw/js")
    .then(reg => {
      console.log("Serbice worker registration successful: " + reg.scope);
    })
    .catch(error => {
      console.log("Registration failed: " + error);
    });
}
