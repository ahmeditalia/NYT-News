import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { articleActions } from '../../../../features/article/articleSlice';
import { autoCompleteStyle, inputPropsStyle } from './SearchBar.styles';


export const SearchBar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const history = useAppSelector(state => state.article.history);
    const dispatch = useAppDispatch();

    const fnSearch = (value: string)=>{
        const params = { search: value };
        dispatch(articleActions.addSearch(value));
        navigate({
            pathname: "/search",
            search: `?${createSearchParams(params)}`,
        });
    }

    const handleInputChange = (event: any, value: string)=>{
        setSearch(value);

    }

    const handleOnChange = (event: any, value: string) => {
        setSearch(value);
        fnSearch(value);
    }


    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == 'Enter') {
            fnSearch(search);
        }
    }

    return (
        <Autocomplete
            value={search}
            onKeyDown={(event) => handleKeyPress(event)}
            onChange={(event, value) => handleOnChange(event, value)}
            onInputChange={(event, value) => handleInputChange(event, value)}
            inputValue={search}
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            sx={autoCompleteStyle}
            options={history.slice(0, 5)}
            renderInput={(params) => (
                <TextField
                    {...params}

                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        color: "secondary",
                        style: inputPropsStyle,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            )}
        />


    )
}