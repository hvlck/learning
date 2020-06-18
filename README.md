# pygmy

 command-line timer tool

Built for learning purposes, based on the `minigrep` project from the [Rust Book](https://doc.rust-lang.org/book/ch12-00-an-io-project.html).

## Usage

Accepts two arguments - `time` and `timer name`.

Timer name can be the amount of seconds, or a follow the `minute:second` format.

`time` is required.

`timer name` isn't required - if it isn't set, the timer's name will be `Default Timer ({time})`.
