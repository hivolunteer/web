import { useState, useEffect } from 'react';
import config from '../../../../config';

interface Evaluation {
    stars_from_volunteer: number;
    comment_from_volunteer: string;
}

const useEvaluations = (missionId: number) => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvaluations = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`${config.apiUrl}/missions/association/rate/${missionId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch evaluations');
                }

                const data = await response.json();
                console.log("data", data);
                setEvaluations(data);
            } catch (err) {
                setError('Failed to fetch evaluations');
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluations();
    }, [missionId]);

    return { evaluations, loading, error };
};

export default useEvaluations;
