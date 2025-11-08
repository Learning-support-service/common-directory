import { BarChart, Bar, LabelList, ResponsiveContainer, XAxis, YAxis,Cell } from 'recharts'
const data = [
    { name: '운영체제', percent: 73, avg: '48초', color: '#D4AF37' },
    { name: '자료구조', percent: 88, avg: '50초', color: '#4CAF50' },
    { name: '웹프레임워크', percent: 75, avg: '45초', color: '#D4AF37' },
];
const SubjectProgressChart = () => {
    return (
        <div className="analysis-section">
            <h3>과목별 성과 분석</h3>
            <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data} layout="vertical" barCategoryGap="20%">
                    {/*y축 : 과목명 */}
                    <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} />
                    <XAxis type="number" hide />

                    {/*진척도 그래프 */}
                    <Bar
                        dataKey="percent"
                        radius={[10, 10, 10, 10]}
                        background={{ fill: "e9e9e9", radius: 8 }}
                        isAnimationActive={true}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />))}
                        {/*퍼센트 표시 */ }
                            < LabelList 
                            dataKey = "percent" 
                            position = "right" 
                            formatter = {(v) => `${v}%`} 
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>

            {/*평균 시간 / 점수 */}
            <div className="score-info">
                {data.map((item) => (
                    <div key={item.name} className="subject-row">
                        <span className="avgTime">{item.avgTime}</span>
                        <span className="score">{item.score}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SubjectProgressChart;