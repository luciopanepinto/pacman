function Timer(callback, delay) {
    var id, started, remaining = delay, running

    this.start = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
	
    this.resume = function() {
        running = true
        started = new Date()
        id = setTimeout(callback, remaining)
    }
	
    this.cancel = function() {
        running = false
        clearTimeout(id)
        remaining = 0;
    }

    this.pause = function() {
        running = false
        clearTimeout(id)
        remaining -= new Date() - started
    }

    this.remain = function() {
        if (running) {
            this.pause()
            this.start()
        }

        return remaining
    }

    this.isRunning = function() {
        return running
    }

    this.start();
}