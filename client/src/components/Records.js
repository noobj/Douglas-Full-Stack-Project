import records from '../mock_data/records.json';

const Records = () =>
{
    return (
        <>
            <h1>Records</h1>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Seconds</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        records.map((record) => (
                            <tr>
                                <td>{record.date}</td>
                                <td>{record.seconds}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
};

export default Records;