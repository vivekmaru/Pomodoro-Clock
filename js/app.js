(function() {
  
  const toggleTimer = document.querySelector(".toggle");
  const resetTimer = document.querySelector(".reset");
  const timer = document.querySelector(".timer");
  const breakSetting = document.querySelector(".breakSetting");
  const breakTime = breakSetting.querySelector(".time");
  const breakDec = breakSetting.querySelector(".decrease");
  const breakInc = breakSetting.querySelector(".increase");
  const taskSetting = document.querySelector(".taskSetting");
  const taskTime = taskSetting.querySelector(".time");
  const taskDec = taskSetting.querySelector(".decrease");
  const taskInc = taskSetting.querySelector(".increase");
  
  const times = {
    task: taskTime.textContent || 25,
    break: breakTime.textContent || 5,
  };

  const state = {
    currTime: times.task * 60,
    break: false,
    running: false,
    runID: 0,
    
    init() {
      this.currTime = times.task * 60;
      timer.textContent = times.task * 60;
      taskTime.textContent = times.task;
      breakTime.textContent = times.break;
    },
    
    displayTime() {
      min = Math.floor(this.currTime / 60);
    sec = this.currTime - min * 60;
    timer.textContent = `${min < 10 ? "0" + min : min}:${sec < 10
      ? "0" + sec
      : sec}`;
    }
  };
  
  function run() {
    if (state.currTime == 0) {
      state.break
        ? ((state.currTime = times.task * 60), (state.break = false))
        : ((state.currTime = times.break * 60), (state.break = true));
    }
    state.displayTime();
    state.currTime = state.currTime - 1;
  }

  function toggleRunState() {
    state.running
      ? (clearInterval(state.runID), (state.running = false), toggleTimer.innerHTML = 'Start')
      : ((state.runID = setInterval(run, 1000)), (state.running = true), toggleTimer.innerHTML = 'Pause');
  }
  
  function changeTaskTime() {
    if(state.running) return;
    this.textContent === '+' ? times.task += 1 : times.task < 6 ? times.task : times.task-= 1;
    state.init();
    state.displayTime();
  }
  
  function changeBreakTime() {
    if(state.running) return;
    this.textContent === '+' ? times.break += 1 : times.break < 6 ? times.break : times.break-= 1;
    state.init();
    state.displayTime();
  }
  
  function reset() {
    times.task = 25;
    times.break = 5;
    state.init();
    state.displayTime();
  }
  
  toggleTimer.addEventListener("click", toggleRunState);
  resetTimer.addEventListener("click", reset);
  taskInc.addEventListener("click", changeTaskTime);
  taskDec.addEventListener("click", changeTaskTime);
  breakInc.addEventListener("click", changeBreakTime);
  breakDec.addEventListener("click", changeBreakTime);
  
  state.init();
  state.displayTime();
  
})();
