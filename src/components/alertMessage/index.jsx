import Alert from "@mui/material/Alert";
const AlertMessage = ({ message, status, variant, cutomClass }) => {
  return (
    <Alert severity={status} variant={variant} className={`${cutomClass}`}>
      {message}
    </Alert>
  );
};

export default AlertMessage;
