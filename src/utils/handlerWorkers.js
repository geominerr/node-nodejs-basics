class HandlerWorkers {
  workers = [];
  qauntityCores = 0;

  constructor(cores) {
    this.qauntityCores = cores;
  }

  resolve(index, data) {
    this.workers.push({ index, status: 'resolved', data });

    this.isCompleted() ? this.showResults() : null;
  }

  reject(index) {
    this.workers.push({ index, status: 'error', data: null });

    this.isCompleted() ? this.showResults() : null;
  }

  showResults() {
    console.log(
      this.workers
        .sort((a, b) => a.index - b.index)
        .map((item) => {
          const { status, data } = item;

          return { status, data };
        })
    );
  }

  isCompleted() {
    return this.workers.length >= this.qauntityCores;
  }
}

export default HandlerWorkers;
