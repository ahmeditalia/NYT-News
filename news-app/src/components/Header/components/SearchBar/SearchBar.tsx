import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, InputAdornment } from '@mui/material';
import { useState } from 'react';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { articleActions } from '../../../../features/categoryArticle/articleSlice';
import { Search, StyledInputBase } from './SearchBar.styles';


export const SearchBar = () => {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const history = useAppSelector(state => state.article.history);
    const handleOnChange = (event: any, value: string) => {
        setSearch(value);
    }
    const dispatch = useAppDispatch();

    const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key == 'Enter') {
            const params = { search: search};
            dispatch(articleActions.addSearch(search));
            navigate({
                pathname: "/search",
                search: `?${createSearchParams(params)}`,
            });
        }
    }

    return (
        <Search>
            <Autocomplete
                value={search}
                onKeyDown={(event) => handleKeyPress(event)}
                onChange={(event, value) => handleOnChange(event, value)}
                onInputChange={(event, value) => handleOnChange(event, value)}
                inputValue={search}
                sx={{ width: { xs: "100%", md: "20ch" } }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={history.slice(0, 5)}

                renderInput={(params) => (
                    <StyledInputBase
                        {...params}

                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            color: "secondary",
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />
        </Search>

    )
}