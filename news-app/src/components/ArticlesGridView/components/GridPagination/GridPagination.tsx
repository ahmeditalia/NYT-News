import { Grid, Pagination } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks';

export const GridPagination = () => {
    const { pages } = useAppSelector(state => state.article);
    const [searchParams , setSearchParams] = useSearchParams();
    const page = Number(searchParams.get("page")) || 1;

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setSearchParams({page: `${value}`})
        window.scrollTo(0, 0);
    };

    return (
        <Grid container item spacing={2} xs={12} justifyContent={"center"}>
            <Pagination
                sx={{ display: "flex", justifyContent: "center" }}
                color='primary'
                count={pages}
                size={'medium'}
                page={page}
                onChange={handleChange} />
        </Grid>
    );
}