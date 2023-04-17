import React, { useState } from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredAge, setEnteredAge] = useState('');
  // const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState();

  const userNameChangeHandler = (event) => {
    setEnteredUserName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      // setIsValid(false);
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredUserName, enteredAge);
    setEnteredUserName('');
    setEnteredAge('');
  };

  const closeModalHandler = () => {
    // setIsValid(true);
    setError();
  };

  return (
    <>
      {/* {!isValid && <ErrorModal title="An error occured" message="Something went wrong!" onOkayClick={closeModalHandler} />} */}
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={closeModalHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">UserName</label>
          <input
            id="username"
            type="text"
            value={enteredUserName}
            onChange={userNameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
