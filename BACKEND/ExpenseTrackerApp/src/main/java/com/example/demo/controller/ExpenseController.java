package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Expense;
import com.example.demo.service.ExpenseService;

@RestController
@RequestMapping("/expenseapi/")
@CrossOrigin(origins = "*")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @GetMapping("/")
    public String home() {
        return "Expense Tracker Backend Running";
    }

    @PostMapping("/add")
    public ResponseEntity<Expense> addExpense(@RequestBody Expense expense) {
        Expense saved = expenseService.addExpense(expense);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Expense>> getAllExpenses() {
        return new ResponseEntity<>(expenseService.getAllExpenses(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable int id) {
        Expense e = expenseService.getExpenseById(id);
        if (e != null) return new ResponseEntity<>(e, HttpStatus.OK);
        return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateExpense(@RequestBody Expense expense) {
        Expense existing = expenseService.getExpenseById(expense.getId());
        if (existing != null) {
            Expense updated = expenseService.updateExpense(expense);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }
        return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteExpense(@PathVariable int id) {
        Expense existing = expenseService.getExpenseById(id);
        if (existing != null) {
            expenseService.deleteExpenseById(id);
            return new ResponseEntity<>("Expense deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Expense not found", HttpStatus.NOT_FOUND);
    }
}
