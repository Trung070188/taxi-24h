document.addEventListener("DOMContentLoaded", function(event) {
    //form contact
    const formContact = document.getElementById("contact_form");
    formContact.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = new FormData(formContact);
        // Validate the form data
        let isValid = await validateContactForm(data);
        if (!isValid) {
            hiddenLoading("form-contact-loading");
            return;
        }
        const action = e.target.action;
        fetch(action, {
            method: "POST",
            body: data,
        }).then((res) => {
            if(res.status == 200){
                hiddenLoading("form-contact-loading");
                let contactRes = document.getElementsByClassName("contact-response-output");
                for (let i = 0; i < contactRes.length; i++) {
                    contactRes[i].innerHTML = 'Xin cảm ơn, form đã được gửi thành công.';
                    contactRes[i].style.color = "green";
                }
            } else {
                hiddenLoading("form-contact-loading");
                let contactRes = document.getElementsByClassName("contact-response-output");
                for (let i = 0; i < contactRes.length; i++) {
                    contactRes[i].innerHTML = 'Có lỗi xảy ra vui lòng thử lại.';
                    contactRes[i].style.color = "red";
                }
            }
        });
    });
    // validation contact form
    async function validateContactForm(data) {
        const phoneInput = data.get("phone");
        const pickUpPlaceInput = data.get("pick_up_place");
        const destinationInput = data.get("destination");
        const pickUpDateInput = data.get("pick_up_date");

        // Remove any existing validation messages
        removeValidationMessage(document.getElementsByName("phone")[0]);
        removeValidationMessage(document.getElementsByName("pick_up_place")[0]);
        removeValidationMessage(document.getElementsByName("destination")[0]);
        removeValidationMessage(document.getElementsByName("pick_up_date")[0]);

        // Validate required fields
        if (!phoneInput) {
            addValidationMessage(document.getElementsByName("phone")[0], "Mục này là bắt buộc.");
        }
        if (!pickUpPlaceInput) {
            addValidationMessage(document.getElementsByName("pick_up_place")[0], "Mục này là bắt buộc.");
        }
        if (!destinationInput) {
            addValidationMessage(document.getElementsByName("destination")[0], "Mục này là bắt buộc.");
        }
        if (!pickUpDateInput) {
            addValidationMessage(document.getElementsByName("pick_up_date")[0], "Mục này là bắt buộc.");
        }

        // Validate the phone input
        if (phoneInput && !isValidPhone(phoneInput)) {
            addValidationMessage(document.getElementsByName("phone")[0], "Số điện thoại không hợp lệ.");
        }

        // If any validation errors exist, return false
        const validationErrors = document.querySelectorAll(".wpcf7-not-valid-tip");
        if (validationErrors.length > 0) {
            return false;
        }

        return true;
    }

    //formFeedBack
    const formFeedBack = document.getElementById("feedback_form");
    formFeedBack.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = new FormData(formFeedBack);
        let isValid = await validateFeedBackForm(data);
        if (!isValid) {
            hiddenLoading("feedback_form");
            return;
        }
        const action = e.target.action;
        fetch(action, {
            method: "POST",
            body: data,
        }).then((res) => {
            if(res.status == 200){
                hiddenLoading("feedback_form");
                let feedbackRes = document.getElementsByClassName("feedback-response-output");
                for (let i = 0; i < feedbackRes.length; i++) {
                    feedbackRes[i].innerHTML = 'Xin cảm ơn, form đã được gửi thành công.';
                    feedbackRes[i].style.color = "green";
                }
            } else {
                hiddenLoading("feedback_form");
                let feedbackRes = document.getElementsByClassName("feedback-response-output");
                for (let i = 0; i < feedbackRes.length; i++) {
                    feedbackRes[i].innerHTML = 'Xin cảm ơn, form đã được gửi thành công.';
                    feedbackRes[i].style.color = "green";
                }
            }
        });
    });
    // validation feedback form
    async function validateFeedBackForm(data) {
        const nameInput = data.get("name");
        const phoneInput = data.get("phoneFeedback");
        const mailInput = data.get("mail");
        const addressInput = data.get("address");
        const contentInput = data.get("content");

        // Remove any existing validation messages
        removeValidationMessage(document.getElementsByName("name")[0]);
        removeValidationMessage(document.getElementsByName("phoneFeedback")[0]);
        removeValidationMessage(document.getElementsByName("mail")[0]);
        removeValidationMessage(document.getElementsByName("address")[0]);
        removeValidationMessage(document.getElementsByName("content")[0]);

        // Validate required fields
        if (!nameInput) {
            addValidationMessage(document.getElementsByName("name")[0], "Mục này là bắt buộc.");
        }
        if (!phoneInput) {
            addValidationMessage(document.getElementsByName("phoneFeedback")[0], "Mục này là bắt buộc.");
        }
        if (!mailInput) {
            addValidationMessage(document.getElementsByName("mail")[0], "Mục này là bắt buộc.");
        }
        if (!addressInput) {
            addValidationMessage(document.getElementsByName("address")[0], "Mục này là bắt buộc.");
        }
        if (!contentInput) {
            addValidationMessage(document.getElementsByName("content")[0], "Mục này là bắt buộc.");
        }

        // Validate the phone input
        if (phoneInput && !isValidPhone(phoneInput)) {
            addValidationMessage(document.getElementsByName("phoneFeedback")[0], "Số điện thoại không hợp lệ.");
        }

        // Validate the email input
        if (mailInput && !isValidEmail(mailInput)) {
            addValidationMessage(document.getElementsByName("mail")[0], "Địa chỉ e-mail không hợp lệ.");
        }

        // If any validation errors exist, return false
        const validationErrors = document.querySelectorAll(".wpcf7-not-valid-tip");
        if (validationErrors.length > 0) {
            return false;
        }

        return true;
    }
    //function helper
    // Add event listeners to input fields and textarea to remove validation messages when changed
    const inputFields = document.querySelectorAll("input");
    inputFields.forEach((inputField) => {
        inputField.addEventListener("input", function () {
            removeValidationMessage(inputField);
        });
    });
    const textareaField = document.querySelector("textarea");
    textareaField.addEventListener("input", function () {
        removeValidationMessage(textareaField);
    });

    // Function to add a validation message element behind an input field
    function addValidationMessage(inputField, message) {
        const validationMessage = document.createElement("span");
        validationMessage.className = "wpcf7-not-valid-tip";
        validationMessage.setAttribute("aria-hidden", "true");
        validationMessage.textContent = message;

        // Insert the validation message element after the input field
        inputField.parentNode.insertBefore(validationMessage, inputField.nextSibling);
    }
    // Function to remove a validation message element
    function removeValidationMessage(inputField) {
        const validationMessage = inputField.nextElementSibling;
        if (validationMessage && validationMessage.className === "wpcf7-not-valid-tip") {
            validationMessage.remove();
        }
    }
    //Function to validate a phone address
    function isValidPhone(phone) {
        // Implement your phone validation logic here
        // You can use regular expressions or other methods to validate the phone number
        return /^[0-9]$/.test(phone); // Example: 10-digit numeric phone number
    }
    // Function to validate an email address
    function isValidEmail(email) {
        // Use a regular expression to check if the email is in a valid format
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    //hidden loading
    function hiddenLoading(elementId) {
        document.getElementById(elementId).classList.remove("processing");
    }
});


