package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A ResulteQuestion.
 */
@Entity
@Table(name = "resulte_question")
public class ResulteQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "employee_weight")
    private Integer employeeWeight;

    @Column(name = "result")
    private Integer result;

    @ManyToOne
    @JsonIgnoreProperties(value = "voters", allowSetters = true)
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties(value = "voters", allowSetters = true)
    private Employee employee;

    @ManyToOne
    @JsonIgnoreProperties(value = "results", allowSetters = true)
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getEmployeeWeight() {
        return employeeWeight;
    }

    public ResulteQuestion employeeWeight(Integer employeeWeight) {
        this.employeeWeight = employeeWeight;
        return this;
    }

    public void setEmployeeWeight(Integer employeeWeight) {
        this.employeeWeight = employeeWeight;
    }

    public Integer getResult() {
        return result;
    }

    public ResulteQuestion result(Integer result) {
        this.result = result;
        return this;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Employee getEmployee() {
        return employee;
    }

    public ResulteQuestion employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Employee getEmployee() {
        return employee;
    }

    public ResulteQuestion employee(Employee employee) {
        this.employee = employee;
        return this;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Question getQuestion() {
        return question;
    }

    public ResulteQuestion question(Question question) {
        this.question = question;
        return this;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ResulteQuestion)) {
            return false;
        }
        return id != null && id.equals(((ResulteQuestion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ResulteQuestion{" +
            "id=" + getId() +
            ", employeeWeight=" + getEmployeeWeight() +
            ", result=" + getResult() +
            "}";
    }
}
