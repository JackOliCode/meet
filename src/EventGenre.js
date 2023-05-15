import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useEffect, useState } from 'react';

const EventGenre = ({ events }) => {
    const [data, setData] = useState([]);
    const colors = ['#42F2F7', '#F61067', '#248232', '#FFC800', '#8B2635'];

    useEffect(() => { setData(() => getData()); }, [events]);
    
    function getData () {
        const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'Angular', 'jQuery,'];
        const data = genres.map((genre) => {
            const value = events.filter(({ summary }) => //value part of data
            summary.split(" ").includes(genre)).length; //split turns summary into array of words
            return { name: genre, value };
    });
    return data;
}



return (

        <ResponsiveContainer width={400} height={400} className='event-genre'>
            <PieChart width={400} height={400}>
            <Pie
                data={data}
                cx={200}
                cy={200}
                labelLine={true}
                outerRadius={80}
                fill='#8884d8'
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {
                data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]} />
                ))
                }
            </Pie>
            </PieChart>
        </ResponsiveContainer>

    );
}
export default EventGenre;