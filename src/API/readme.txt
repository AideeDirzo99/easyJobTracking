API LAYER
=========

This folder contains all functions that communicate with external services
(Firebase, HTTP APIs, third-party SDKs, etc.).

The goal is to isolate infrastructure logic from the rest of the application.


WHAT GOES HERE
--------------

- Firebase calls (auth, firestore, functions, etc.)
- HTTP / API requests
- SDK integrations
- Any function that talks to external services


WHAT DOES NOT GO HERE
---------------------

- UI logic (Notify, Dialogs, Toasts, etc.)
- Stores or global state
- Vue components or composables
- i18n or presentation logic


WHY THIS EXISTS
---------------

- Keeps functions independent and reusable
- Reduces coupling between app layers
- Makes the codebase easier to maintain and refactor
- Prevents infrastructure changes from affecting the UI


SIMPLE RULE
-----------

These functions talk to the outside world,
but they do not decide how the UI behaves.
