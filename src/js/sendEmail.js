const URL = "http://mockbin.com/request?foo=bar&foo=baz";
const form = document.querySelector("#contactForm");

const sendEmail = {
  name: "",
  email: "",
  message: "",
};

function send(e) {
  e.preventDefault();

  const formEl = document.forms.contactForm;
  const formData = new FormData(formEl);

  sendEmail.name = formData.get("name");
  sendEmail.email = formData.get("email");
  sendEmail.message = formData.get("message");

  fetchData();
}

form.addEventListener("submit", send);

function fetchData() {
  fetch(URL, {
    method: "POST",
    headers: {
      cookie: "foo=bar; bar=baz",
      "x-pretty-print": "2",
    },
    body: JSON.stringify(sendEmail),
  })
    .then((response) => {
      if (response.ok) {
        formatOutput();
        return response.json();
      } else {
        return Promise.reject(response);
      }
    })
    .catch((err) => {
      console.warn(err);
    });
}

function formatOutput() {
  form.innerHTML =
    "<div id='form-sucesso'><h2>Formulário enviado com sucesso.</h2><p>Em breve entramos em contato com você!</p></div>";
}
