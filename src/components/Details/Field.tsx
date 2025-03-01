import { AccordionSummary, Accordion, AccordionDetails, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface FieldProps {
  name: string;
  value: string;
}

export const Field = (props:  FieldProps) => {
  const { name, value } = props;
  return (
    <Grid item xs={12}>
      <Accordion>
        <AccordionSummary expandIcon={ <ExpandMoreIcon/> } aria-controls='panel1a-content' id='panel11a-header'></AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Grid>
  )
}