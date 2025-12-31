import { useState } from 'react';
import useFetch from '@/common/hooks/useFetch';
import { SessionsService } from '@/api/services/sessions.service';
import { SessionCard } from './components/SessionCard';
import styles from './Session.module.css';

const Sessions = () => {
    const { data: sessions, isLoading, error } = useFetch(SessionsService.getSessions);
    const [searchTerm, setSearchTerm] = useState('');

    if (isLoading) return <div className={styles.loading}>Accessing the Akashic Records...</div>;
    if (error) return <div className={styles.error}>Connection to the source interrupted: {error.message}</div>;

    const filteredSessions = sessions?.filter(session =>
        session.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Explore Sessions</h1>
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search for wisdom..."
                        className={styles.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            
            <div className={styles.grid}>
                {filteredSessions?.map(session => (
                    <SessionCard key={session.id} session={session} />
                ))}
            </div>

            {filteredSessions?.length === 0 && (
                <div className={styles.loading}>
                    No sessions found matching your frequency.
                </div>
            )}
        </div>
    );
};

export default Sessions;
