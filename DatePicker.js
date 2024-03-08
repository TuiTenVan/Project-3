class DatePicker {
	constructor(id, callback) {
	  this.id = id;
	  this.callback = callback;
	  this.currentDate = new Date();
	}
  
	render(selectedDate) {
	  this.selectedDate = selectedDate;
	  const calendarContainer = document.getElementById(this.id);
	  calendarContainer.innerHTML = this.generateCalendarHTML();
	  this.addEventListeners();
	}
  
	generateCalendarHTML() {
	  const monthNames = [
		'January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	  ];
  
	  const currentDate = new Date(this.selectedDate);
	  const currentMonth = currentDate.getMonth();
	  const currentYear = currentDate.getFullYear();
  
	  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
	  const startingDay = firstDayOfMonth.getDay();
  
	  const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  
	  let html = `<div class="calendar">
		<div class="header">
		  <span class="prev-month">&lt;</span>
		  <span class="month">${monthNames[currentMonth]} ${currentYear}</span>
		  <span class="next-month">&gt;</span>
		</div>
		<div class="days-header">
		  <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
		</div>
		<div class="days-grid">`;
  
	  let day = 1;
	  for (let i = 0; i < 6; i++) {
		for (let j = 0; j < 7; j++) {
		  if (i === 0 && j < startingDay) {
			html += '<div class="day other-month"></div>';
		  } else if (day > numDaysInMonth) {
			break;
		  } else {
			const isCurrentMonth = (day === this.currentDate.getDate() && currentMonth === this.currentDate.getMonth() && currentYear === this.currentDate.getFullYear());
			html += `<div class="day ${isCurrentMonth ? 'current-month' : 'other-month'}" data-day="${day}">${day}</div>`;
			day++;
		  }
		}
	  }
  
	  html += '</div></div>';
	  return html;
	}
  
	addEventListeners() {
	  const prevMonthBtn = document.querySelector(`#${this.id} .prev-month`);
	  const nextMonthBtn = document.querySelector(`#${this.id} .next-month`);
	  const days = document.querySelectorAll(`#${this.id} .day`);
  
	  prevMonthBtn.addEventListener('click', () => this.changeMonth(-1));
	  nextMonthBtn.addEventListener('click', () => this.changeMonth(1));
  
	  days.forEach(day => {
		day.addEventListener('click', () => {
		  const selectedDay = parseInt(day.getAttribute('data-day'));
		  this.selectedDate.setDate(selectedDay);
		  this.callback(this.id, {
			day: selectedDay,
			month: this.selectedDate.getMonth() + 1,
			year: this.selectedDate.getFullYear()
		  });
		});
	  });
	}
  
	changeMonth(step) {
	  this.selectedDate.setMonth(this.selectedDate.getMonth() + step);
	  this.render(this.selectedDate);
	}
  }
  