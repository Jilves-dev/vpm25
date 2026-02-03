import { useState, useMemo } from 'react';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';

function Stats({ data }) {
  const [timeRange, setTimeRange] = useState('all');

  // Viitearvot
  const REFERENCE = {
    systolic: 130,
    diastolic: 85
  };

  // Suodata data valitun aikajakson mukaan
  const filteredData = useMemo(() => {
    if (timeRange === 'all') return data;

    const now = new Date();
    const cutoffDate = new Date();

    switch (timeRange) {
      case '1m':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3m':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6m':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        return data;
    }

    return data.filter(item => new Date(item.pv) >= cutoffDate);
  }, [data, timeRange]);

  // Laske keskiarvot ja vertailu
  const analysis = useMemo(() => {
    if (filteredData.length === 0) {
      return null;
    }

    const sumYp = filteredData.reduce((sum, item) => sum + item.yp, 0);
    const sumAp = filteredData.reduce((sum, item) => sum + item.ap, 0);
    const sumSyke = filteredData.reduce((sum, item) => sum + item.syke, 0);

    const avgYp = sumYp / filteredData.length;
    const avgAp = sumAp / filteredData.length;
    const avgSyke = sumSyke / filteredData.length;

    // Laske prosentuaaliset erot viitearvoista
    const systolicDiff = ((avgYp - REFERENCE.systolic) / REFERENCE.systolic * 100).toFixed(1);
    const diastolicDiff = ((avgAp - REFERENCE.diastolic) / REFERENCE.diastolic * 100).toFixed(1);

    // Määritä tila
    const isNormal = avgYp < 130 && avgAp < 85;
    const isElevated = avgYp >= 130 && avgYp < 140 && avgAp >= 85 && avgAp < 90;
    const isHigh = avgYp >= 140 || avgAp >= 90;

    let status = '';
    let statusColor = '';
    if (isNormal) {
      status = 'Normaali';
      statusColor = 'bg-green-100 text-green-800 border-green-300';
    } else if (isElevated) {
      status = 'Lievästi koholla';
      statusColor = 'bg-yellow-100 text-yellow-800 border-yellow-300';
    } else if (isHigh) {
      status = 'Koholla';
      statusColor = 'bg-red-100 text-red-800 border-red-300';
    }

    return {
      avgYp: avgYp.toFixed(2),
      avgAp: avgAp.toFixed(2),
      avgSyke: avgSyke.toFixed(2),
      systolicDiff: parseFloat(systolicDiff),
      diastolicDiff: parseFloat(diastolicDiff),
      status,
      statusColor,
      isNormal
    };
  }, [filteredData]);

  // Muuta data graafille sopivaan muotoon
  const linedata = useMemo(() => {
    return filteredData.map(item => ({
      date: new Date(item.pv).getTime(),
      Systolinen: item.yp,
      Diastolinen: item.ap,
      Syke: item.syke
    }));
  }, [filteredData]);

  const timeRangeButtons = [
    { value: '1m', label: '1kk' },
    { value: '3m', label: '3kk' },
    { value: '6m', label: '6kk' },
    { value: '1y', label: '1v' },
    { value: 'all', label: 'Kaikki' }
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Tilastot</h2>

      {/* Aikajakson valinta */}
      <div className="flex flex-wrap gap-2 mb-6">
        {timeRangeButtons.map(btn => (
          <button
            key={btn.value}
            onClick={() => setTimeRange(btn.value)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              timeRange === btn.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Näytä mittausten määrä */}
      <div className="mb-4 text-sm text-gray-600">
        Näytetään {filteredData.length} mittausta
      </div>

      {!analysis ? (
        <div className="text-center py-8 text-gray-500">
          Ei mittaustuloksia valitulta ajanjaksolta.
        </div>
      ) : (
        <>
          {/* Status-kortti */}
          <div className={`mb-6 p-4 rounded-lg border-2 ${analysis.statusColor}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-bold">Verenpaineesi tila:</h3>
              <span className="text-2xl font-bold">{analysis.status}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Systolinen keskiarvo:</span>
                <span className="font-semibold">
                  {analysis.avgYp} mmHg 
                  <span className={analysis.systolicDiff > 0 ? 'text-red-600' : 'text-green-600'}>
                    {' '}({analysis.systolicDiff > 0 ? '+' : ''}{analysis.systolicDiff}%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Diastolinen keskiarvo:</span>
                <span className="font-semibold">
                  {analysis.avgAp} mmHg 
                  <span className={analysis.diastolicDiff > 0 ? 'text-red-600' : 'text-green-600'}>
                    {' '}({analysis.diastolicDiff > 0 ? '+' : ''}{analysis.diastolicDiff}%)
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span>Syke keskiarvo:</span>
                <span className="font-semibold">{analysis.avgSyke}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-current/20 text-xs">
              <p>
                Viitearvot: Systolinen {'<'} 130 mmHg, Diastolinen {'<'} 85 mmHg
              </p>
              {!analysis.isNormal && (
                <p className="mt-1 font-semibold">
                  ⚠️ Keskustele tuloksista lääkärin kanssa.
                </p>
              )}
            </div>
          </div>

          {/* Tulkinta */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Tulkinta:</strong> {' '}
              {analysis.isNormal ? (
                'Verenpaineesi on normaalilla tasolla. Jatka terveellisiä elämäntapoja!'
              ) : analysis.status === 'Lievästi koholla' ? (
                'Verenpaineesi on lievästi koholla. Kiinnitä huomiota suolan vähentämiseen, liikuntaan ja stressinhallintaan.'
              ) : (
                'Verenpaineesi on koholla. Ota yhteys lääkäriin arvioinnin ja mahdollisen hoidon aloittamiseksi.'
              )}
            </p>
          </div>

          {/* Graafi */}
          <ResponsiveContainer width="100%" height={360}>
            <LineChart
              data={linedata}
              margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 10
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="date"
                domain={["dataMin", "dataMax"]}
                scale="time"
                tickFormatter={timeStr => new Date(timeStr).toLocaleDateString("fi-FI")}
              />
              <Legend />
              <YAxis />

              {/* Viitearvon viivat */}
              <Line
                type="linear"
                dataKey={() => 130}
                stroke="#999"
                strokeDasharray="5 5"
                dot={false}
                name="Viitearvo (systolinen)"
              />
              <Line
                type="linear"
                dataKey={() => 85}
                stroke="#666"
                strokeDasharray="5 5"
                dot={false}
                name="Viitearvo (diastolinen)"
              />

              <Line
                type="linear"
                dataKey="Systolinen"
                stroke="#ff0000"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />

              <Line
                type="linear"
                dataKey="Diastolinen"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />

              <Line
                type="linear"
                dataKey="Syke"
                stroke="#db7093"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />

              <Tooltip labelFormatter={value => new Date(value).toLocaleDateString("fi-FI")} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

export default Stats;