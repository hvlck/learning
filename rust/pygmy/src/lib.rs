use std::time::Duration;
use std::thread::sleep;

use ansi_term::{Color};

pub struct Timer {
	pub duration_string: String,
	pub duration: u64,
	pub name: String,
	pub started: bool
}

impl Timer {
	pub fn new(mut args: std::env::Args) -> Result<Timer, &'static str> {
		args.next();

		let time = match args.next() {
			Some(val) => val,
			None => return Err("No time specified.")
		};

		let index = match time.find(':') {
			Some(val) => val,
			None => 0
		};

		let name = match args.next() {
			Some(val) => val,
			None => String::from("Default Timer (") + &time[..] + ")"
		};

		if index == 0 {
			Ok(Timer {
				duration: time.clone().parse::<u64>().unwrap(),
				duration_string: time,
				name: name,
				started: false
			})
		} else {
			Ok(Timer {
				duration: (time.clone()[..index].parse::<u64>().unwrap() * 60) + time.clone()[index + 1..].parse::<u64>().unwrap(),
				duration_string: time,
				name: name,
				started: false
			})
		}
	}

	pub fn start(&self) {
		let sleep_time = self.duration / 10;
		
		println!("Starting timer: {} {}", Color::Green.underline().paint(format!("{}", self.name)), Color::Yellow.paint(format!("(Duration: {}s)", self.duration)));

		let mut index = 1;

		while index <= 10 {
			sleep(Duration::new(sleep_time, 0));
			println!("{} {} ({}s / {}s)", Color::Green.underline().paint(format!("{}:", self.name)), Color::Blue.paint(format!("{}%", index * 10)), sleep_time * index, self.duration);
			index += 1;
		}

		println!("{} {} {}.", Color::Red.bold().paint(format!("Completed timer:")), Color::Green.underline().paint(format!("{}", self.name)), Color::Yellow.paint(format!("({}s)", self.duration)));
	}
}
