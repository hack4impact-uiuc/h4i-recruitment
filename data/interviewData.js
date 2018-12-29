export default [
    {
        round: '1',
        type: 'mass_interview',
        name: 'Mass Interview',
        categories: [
            {
                title: 'Overall Score',
                minScore: 0,
                maxScore: 5,
                description: (
                    <p style={{ color: 'grey' }}>
                        description here which would show up as grey. Note that you could make this an actual
                        react component here
          </p>
                )
            }
        ]
    }
]
