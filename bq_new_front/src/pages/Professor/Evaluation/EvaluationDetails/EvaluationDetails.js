import React, {useEffect, useState} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Button,
  TextField, IconButton,
  TableBody, Table, TableCell,
  TableRow, TableHead, TablePagination, LinearProgress
} from '@material-ui/core';
import api from "../../../../services/api";
import Swal from "sweetalert2";
import validate from "validate.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import QuestionCard from "../../../../components/QuestionCard";

const schema = {
  description: {
    presence: {allowEmpty: false, message: 'A descrição é obrigatória.'},
    length: {
      minimum: 4,
      maximum: 300,
      message: 'A descrição deve conter no mínimo 4 e no máximo 300 caracteres.'
    }
  }
};

const useStyles = makeStyles(() => ({
  root: {},
  headTable: {
    fontWeight: "bold"
  },
  fab:{
    backgroundColor: '#009688',
    color: '#e0f2f1',
  },
  labelRed: {
    backgroundColor: '#EC0B43',
    display: 'block',
    margin: '10px',
    padding: '5px',
    textAlign: 'center',
    color: '#fff',
    borderRadius: 4
  },
}));

const EvaluationDetails = props => {
  const { className, history, ...rest } = props;
  const { codigoEvaluation } = props.match.params;

  const classes = useStyles();

  const [questions, setQuestions] = useState(null);
  const [refresh, setRefresh] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  //configuration alert
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  function loadAlert(icon, message) {
    Toast.fire({
      icon: icon,
      title: message
    });
  }

  async function saveEvaluationDetails(){
    try {
      const description = formState.values.description;

      const id = formState.values.id;
      const data = {
        description
      }
      let response= {};
      let acao = "";
      if(!id) {
         response = await api.post('evaluation', data);
         acao = "cadastrada";
      } else {
         response = await api.put('evaluation/'+id, data);
        acao = "atualizada";
      }
      if (response.status === 202) {
        if(response.data.message){
          loadAlert('error', response.data.message);
        } else if(response.data.errors[0].description){
          loadAlert('error', response.data.errors[0].description);
        }
      } else {
        loadAlert('success', 'Avaluação '+acao+'.');
        history.push('/evaluations');
      }

    } catch (error) {

    }
  }

  async function loadQuestionsEvaluation(id, page){
    try {
      const response = await api.get('evaluation/show/questions/'+id+'?page='+page);
      if (response.status === 200) {
        setQuestions(response.data.data);
        setTotal(response.data.total);
      } else {
        setQuestions([]);
      }
    } catch (error) {

    }
  }

  async function findAEvaluation(id){
    try {
      const response = await api.get('evaluation/show/'+id);
      if (response.status === 202) {
        if(response.data.message){
          loadAlert('error', response.data.message);
        }
      } else {
        setFormState(formState => ({
          values: {
            'questions': response.data[0].questions,
            'description': response.data[0].description,
            'id': response.data[0].id
          },
          touched: {
            ...formState.touched,
          }
        }));
        //setQuestions(response.data[0].questions);
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    if(codigoEvaluation){
      findAEvaluation(codigoEvaluation);
      loadQuestionsEvaluation(codigoEvaluation);
    } else {
      setQuestions([]);
    }

  }, [refresh]);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: (errors || formState.values.course==0) ? false : true,
      errors: errors || {}
    }));
  }, [formState.values, questions]);

  const handleChange = event => {
    setFormState({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    });
  };

  const hasError = field =>
      formState.touched[field] && formState.errors[field] ? true : false;

  const handleBack = () => {
    history.goBack();
  };

  const handlePageChange = (event, page) => {
    if(codigoEvaluation) {
      loadQuestionsEvaluation(codigoEvaluation, page + 1)
    }
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}>
      <form
        autoComplete="off">
        <div className={classes.contentHeader}>
          <IconButton onClick={handleBack}>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <CardHeader
          subheader=""
          title="Avaliação"/>
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={1}>
            <Grid
              item
              md={12}
              xs={12}>
              <TextField
                fullWidth
                error={hasError('description')}
                helperText={
                  hasError('description') ? formState.errors.description[0] : null
                }
                label="Descrição"
                margin="dense"
                name="description"
                onChange={handleChange}
                value={formState.values.description || ''}
                variant="outlined"
              />
              <Button
                  color="primary"
                  variant="outlined"
                  disabled={!formState.isValid}
                  onClick={saveEvaluationDetails}>
                Salvar
              </Button>
            </Grid>
            <Divider />
          </Grid>
          { questions == null ?
              <LinearProgress color="secondary" />
              :
              questions[0] ?
          <Grid
              container
              spacing={1}>
            <Grid
                item
                md={12}
                xs={12}>
              <Table>
                <TableHead>
                  <TablePagination
                      component="div"
                      count={total}
                      onChangePage={handlePageChange}
                      onChangeRowsPerPage={handleRowsPerPageChange}
                      page={page}
                      rowsPerPage={rowsPerPage}
                      rowsPerPageOptions={[5]}
                  />
                </TableHead>
                <TableBody>
                  {questions.map(question => (
                      <QuestionCard
                          question={question.question}
                          id_evaluation={codigoEvaluation}
                          setRefresh={setRefresh}
                          refresh={refresh}/>
                  ))}
                </TableBody>
                <TablePagination
                    component="div"
                    count={total}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handleRowsPerPageChange}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5]}
                />
              </Table>
            </Grid>
          </Grid>
              :
                  codigoEvaluation?
                       <span className={classes.labelRed}>Esta avaliação não possui questões</span>
                      : null
          }
        </CardContent>
        <Divider />
      </form>
    </Card>
  );
};

EvaluationDetails.propTypes = {
  className: PropTypes.string,
};

export default EvaluationDetails;
