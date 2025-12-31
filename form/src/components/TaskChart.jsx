import { PieChart, Pie, Cell } from "recharts";

export const TaskChart = ({ tasks }) => {
    const completed = tasks.filter(t => t.completed).length;
    const pending = tasks.length - completed;

    const data = [
        { name: "Completed", value: completed },
        { name: "Pending", value: pending }
    ];

    return (
        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center">
            <h3 className="text-sm font-semibold mb-2 text-gray-600">Task Progress</h3>
            <PieChart width={200} height={200}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={70}>
                    <Cell fill="#4f46e5" />
                    <Cell fill="#f97316" />
                </Pie>
            </PieChart>
            <p className="text-xs text-gray-500 mt-2">
                {completed} done / {pending} pending
            </p>
        </div>
    );
};
