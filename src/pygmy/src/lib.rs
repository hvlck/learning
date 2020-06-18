use std::time::Duration;

#[derive(Debug)]
pub struct Timer {
	pub duration_string: String,
	pub duration: u32,
	pub name: String,
	pub start_time: String,
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
			None => String::from("Default")
		};

		if index == 0 {
			Ok(Timer {
				duration: time.clone().parse::<u32>().unwrap(),
				duration_string: time,
				name: name,
				start_time: String::from(""),
				started: false
			})
		} else {
			Ok(Timer {
				duration: (time.clone()[..index].parse::<u32>().unwrap() * 60) + 20,
				duration_string: time,
				name: name,
				start_time: String::from(""),
				started: false
			})
		}
	}
}

#[cfg(test)]
mod tests {
	use super::*;
}