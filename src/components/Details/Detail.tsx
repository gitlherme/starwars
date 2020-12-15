import { CircularProgress, Grid, Button } from '@material-ui/core';
import { SWAPIEndpoint } from '../../api/generic-api';
import { useDetail } from './UseDetail';
import { getDetailData } from '../../api/controller-defs'
import { Field } from './Field'

interface DetailProps {
  id: number;
  controller: SWAPIEndpoint;
}

const Detail = (props: DetailProps) => {
  const { id, controller } = props;
  const { isLoading, result, error} = useDetail(id, controller);
  const columns = getDetailData(controller);

  if (isLoading) return <div><CircularProgress/></div>;
  if (!result) return null;

  return (
    <Grid container direction={'column'} spacing={2} alignItems={'stretch'}>
      <Grid>
        { Object
          .entries(result)
          .filter(item => { 
            const [key] = item; 
            return columns?.find(campo => campo === key);
          })
          .map(item => {
            const [key, value] = item;
            return <Field name={key} value={value} />
          })
        }
      </Grid>
      <Grid>
        <Button variant={'outlined'}>Voltar</Button>
      </Grid>
    </Grid>
  )
}