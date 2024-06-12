import { Container, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import useEvaluations from './useEvaluations';
import { useParams } from 'react-router-dom';

interface RouteParams {
    missionId: string;
    [key: string]: string | undefined;
}


function Evaluations() {
    const { missionId } = useParams<RouteParams>();
    const { evaluations, loading, error } = useEvaluations(parseInt(missionId ?? "0", 10));

    const averageRating = evaluations.length ? evaluations.reduce((acc, curr) => acc + curr.stars_from_volunteer, 0) / evaluations.length : 0;

    return (
        <Container maxWidth="md" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
        
        }}>
            <Card sx={{ maxHeight: '500px', overflow: 'auto' }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Les Evaluations de la mission
                    </Typography>
                    {loading ? (
                        <Box display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <>
                            <Typography variant="h6">La note moyenne : {averageRating.toFixed(2)}</Typography>

                                <Box my={2} p={2} border={1} borderRadius={1} borderColor="grey.300">
                                    <Typography variant="body1">{"Bonne mission"}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Notes de bénévoles : {2}
                                    </Typography>
                                </Box>
                            
                        </>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
};


export default Evaluations;
