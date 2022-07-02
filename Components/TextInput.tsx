import React from 'react';
import TextField from "@mui/material/TextField";
type data = {
        message: string
}
interface Input {
    id: string,

    field: []
    data: data,
    type: string
}
const TextInput : React.JSXElementConstructor<any> = ({id, field, data, type}: Input) => {

    return (
        <>
            <TextField
                margin="normal"
                required
                fullWidth
                error={!!data}
                helperText={data?.message}
                {...field}
                id={id}
                type={type? type : 'text'}
                label={id}
                name={id}
                autoComplete={id}
                autoFocus
            />
        </>
    )
};

export default TextInput;