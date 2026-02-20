
const script = {
  expenses: [],
  id: 1,

  addExpense(title, amount, category) {
    if (!title ||  !category ||  isNaN(amount) ||  amount <= 0) {
      console.log("Ошибка ввода");
      return;
    }

    const expense = {
      id: this.id++,
      title: title,
      amount: amount,
      category: category
    };

    this.expenses.push(expense);
    console.log("Расход добавлен");
  },

  printAllExpenses() {
    if (this.expenses.length === 0) {
      console.log("Список пуст");
      return;
    }

    this.expenses.forEach(e => {
      console.log(`${e.id} | ${e.title} | ${e.amount} | ${e.category}`);
    });
  },

  getTotalAmount() {
    let total = 0;

    for (let e of this.expenses) {
      total += e.amount;
    }

    console.log("Общая сумма расходов:", total);
    console.log("Чек сформирован");
    return total;
  },

  getExpensesByCategory(category) {
    const list = this.expenses.filter(e => e.category === category);

    let sum = 0;
    list.forEach(e => sum += e.amount);

    console.log("Расходы по категории:", category);
    console.log(list);
    console.log("Потрачено:", sum);

    return list;
  },

  findExpenseByTitle(text) {
    const item = this.expenses.find(e =>
      e.title.toLowerCase().includes(text.toLowerCase())
    );

    if (!item) {
      console.log("Не найдено");
      return;
    }

    console.log("Найдено:", item);

    const extra = prompt("Добавить текст к названию?");
    if (extra) {
      item.title += " " + extra;
    }

    return item;
  },

  removeExpenseById(id) {
    this.expenses = this.expenses.filter(e => e.id !== id);
    console.log("Удалено");
  },

  printStats() {
    const stats = {};

    this.expenses.forEach(e => {
      stats[e.category] = (stats[e.category] || 0) + e.amount;
    });

    console.log("Статистика по категориям:");
    console.log(stats);
  }
};

function start() {
  while (true) {
    const choice = prompt(
`1 добавить расход
2 показать все
3 общая сумма
4 по категории
5 поиск
6 удалить по id
7 статистика
0 выход`
    );

    if (choice === "1") {
      const title = prompt("Название:");
      const amount = Number(prompt("Сумма:"));
      const category = prompt("Категория:");
      tracker.addExpense(title, amount, category);
    }

    else if (choice === "2") tracker.printAllExpenses();
    else if (choice === "3") tracker.getTotalAmount();
    else if (choice === "4") tracker.getExpensesByCategory(prompt("Категория:"));
    else if (choice === "5") tracker.findExpenseByTitle(prompt("Поиск:"));
    else if (choice === "6") tracker.removeExpenseById(Number(prompt("ID:")));
    else if (choice === "7") tracker.printStats();
    else if (choice === "0") break;
    else console.log("Неверный ввод");
  }
}

start();



