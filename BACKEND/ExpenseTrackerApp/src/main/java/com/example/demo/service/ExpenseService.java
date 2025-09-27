package com.example.demo.service;

import com.example.demo.entity.Expense;
import java.util.List;

public interface ExpenseService {
    Expense addExpense(Expense expense);
    List<Expense> getAllExpenses();
    Expense getExpenseById(int id);
    Expense updateExpense(Expense expense);
    void deleteExpenseById(int id);
}
