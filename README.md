# portfolio-wa24

A portfolio project created during the Web Applications course at Østfold University College.

## Setup steps

1. Run `npm run first-time-setup` in the root folder
3. Rename `.env-example` to `.env` in the backend folder

## Running the app

Run `npm run dev` in the root folder

## Notes

The authentication system is very barebones, and only implemented for getting projects. Set a cookie named `user.id` with the value `dba76a8c-6bc1-4d92-b00f-7361faf71681` to see unpublished projects appear for the authorized user. Creating projects has been set to saving them as published by default in order to reduce confusion.
