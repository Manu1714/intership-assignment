import { useState, useEffect, useCallback } from "react";

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_API = "https://api.open-meteo.com/v1/forecast";

const WMO_CODES = {
  0: { label: "Clear Sky", icon: "☀️", bg: ["#f97316", "#fbbf24"] },
  1: { label: "Mainly Clear", icon: "🌤️", bg: ["#f97316", "#fbbf24"] },
  2: { label: "Partly Cloudy", icon: "⛅", bg: ["#64748b", "#94a3b8"] },
  3: { label: "Overcast", icon: "☁️", bg: ["#475569", "#64748b"] },
  45: { label: "Foggy", icon: "🌫️", bg: ["#64748b", "#94a3b8"] },
  48: { label: "Icy Fog", icon: "🌫️", bg: ["#64748b", "#94a3b8"] },
  51: { label: "Light Drizzle", icon: "🌦️", bg: ["#3b82f6", "#60a5fa"] },
  53: { label: "Drizzle", icon: "🌦️", bg: ["#2563eb", "#3b82f6"] },
  55: { label: "Heavy Drizzle", icon: "🌧️", bg: ["#1d4ed8", "#2563eb"] },
  61: { label: "Light Rain", icon: "🌧️", bg: ["#2563eb", "#3b82f6"] },
  63: { label: "Moderate Rain", icon: "🌧️", bg: ["#1d4ed8", "#2563eb"] },
  65: { label: "Heavy Rain", icon: "🌧️", bg: ["#1e3a8a", "#1d4ed8"] },
  71: { label: "Light Snow", icon: "🌨️", bg: ["#7dd3fc", "#bae6fd"] },
  73: { label: "Moderate Snow", icon: "❄️", bg: ["#38bdf8", "#7dd3fc"] },
  75: { label: "Heavy Snow", icon: "❄️", bg: ["#0ea5e9", "#38bdf8"] },
  80: { label: "Rain Showers", icon: "⛈️", bg: ["#1d4ed8", "#2563eb"] },
  81: { label: "Rain Showers", icon: "⛈️", bg: ["#1d4ed8", "#2563eb"] },
  82: { label: "Violent Showers", icon: "⛈️", bg: ["#1e3a8a", "#1d4ed8"] },
  95: { label: "Thunderstorm", icon: "⛈️", bg: ["#1e1b4b", "#312e81"] },
  96: { label: "Thunderstorm + Hail", icon: "⛈️", bg: ["#1e1b4b", "#312e81"] },
  99: { label: "Thunderstorm + Hail", icon: "⛈️", bg: ["#1e1b4b", "#312e81"] },
};

const getWeatherInfo = (code) =>
  WMO_CODES[code] || { label: "Unknown", icon: "🌡️", bg: ["#6b7280", "#9ca3af"] };

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const formatDay = (dateStr) => {
  const d = new Date(dateStr);
  return days[d.getDay()];
};

const getWindDir = (deg) => {
  const dirs = ["N","NE","E","SE","S","SW","W","NW"];
  return dirs[Math.round(deg / 45) % 8];
};

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ w = "100%", h = "1rem", r = "0.5rem" }) {
  return (
    <div
      style={{
        width: w, height: h, borderRadius: r,
        background: "rgba(255,255,255,0.12)",
        animation: "pulse 1.6s ease-in-out infinite",
      }}
    />
  );
}

// ── Error Card ────────────────────────────────────────────────────────────────
function ErrorCard({ message, onRetry }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "1.25rem", padding: "3rem 2rem",
      textAlign: "center",
    }}>
      <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>⚠️</div>
      <div>
        <p style={{ margin: 0, fontSize: "1.1rem", fontWeight: 600, color: "#fff", letterSpacing: "0.02em" }}>
          Something went wrong
        </p>
        <p style={{ margin: "0.4rem 0 0", fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", maxWidth: "22rem" }}>
          {message}
        </p>
      </div>
      <button onClick={onRetry} style={{
        background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.3)",
        color: "#fff", padding: "0.55rem 1.4rem", borderRadius: "2rem",
        cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, letterSpacing: "0.05em",
        transition: "background 0.2s",
      }}
        onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.28)"}
        onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.18)"}
      >
        Try Again
      </button>
    </div>
  );
}

// ── Loading Skeleton UI ───────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div style={{ padding: "2rem 1.5rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Skeleton w="60%" h="1rem" />
        <Skeleton w="25%" h="1rem" />
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "1rem" }}>
        <Skeleton w="4rem" h="4rem" r="1rem" />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          <Skeleton w="40%" h="3rem" r="0.75rem" />
          <Skeleton w="55%" h="1rem" />
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.75rem" }}>
        {[...Array(4)].map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <Skeleton h="0.75rem" />
            <Skeleton h="0.75rem" w="60%" />
            <Skeleton h="1.25rem" />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <Skeleton w="2.5rem" h="0.9rem" />
            <Skeleton w="1.5rem" h="1.5rem" r="50%" />
            <Skeleton h="0.9rem" />
            <div style={{ marginLeft: "auto", display: "flex", gap: "0.5rem" }}>
              <Skeleton w="2rem" h="0.9rem" />
              <Skeleton w="2rem" h="0.9rem" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function WeatherDashboard() {
  const [query, setQuery] = useState("Mumbai");
  const [inputVal, setInputVal] = useState("Mumbai");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState("C"); // C or F
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const toF = (c) => Math.round(c * 9 / 5 + 32);
  const displayTemp = (c) => unit === "C" ? `${Math.round(c)}°C` : `${toF(c)}°F`;

  const fetchWeather = useCallback(async (cityName) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    try {
      // Step 1: Geocode the city
      const geoRes = await fetch(`${GEOCODING_API}?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`);
      if (!geoRes.ok) throw new Error("Geocoding service unavailable.");
      const geoData = await geoRes.json();
      if (!geoData.results?.length) throw new Error(`City "${cityName}" not found. Please check the spelling.`);
      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Fetch weather
      const params = new URLSearchParams({
        latitude, longitude,
        current: "temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,precipitation,surface_pressure",
        daily: "temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum,uv_index_max",
        timezone: "auto",
        forecast_days: 7,
      });
      const wxRes = await fetch(`${WEATHER_API}?${params}`);
      if (!wxRes.ok) throw new Error("Weather service unavailable. Please try again.");
      const wxData = await wxRes.json();
      setWeather({ ...wxData, city: name, country });
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchWeather(query); }, [query, fetchWeather]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputVal.trim()) setQuery(inputVal.trim());
  };

  // Derive theme from weather
  const wInfo = weather
    ? getWeatherInfo(weather.current.weather_code)
    : { bg: ["#1e3a5f", "#0f172a"], icon: "🌐", label: "" };
  const [c1, c2] = wInfo.bg;

  const panelBg = `linear-gradient(145deg, ${c1}cc, ${c2}ee)`;

  return (
    <div style={{
      minHeight: "100vh",
      background: `radial-gradient(ellipse at 30% 20%, ${c1}55, transparent 60%),
                   radial-gradient(ellipse at 80% 80%, ${c2}44, transparent 60%),
                   linear-gradient(160deg, #0c1220 0%, #111827 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      padding: "2rem 1rem",
      transition: "background 0.8s ease",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:.5} 50%{opacity:1} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { display: none; }
        input::placeholder { color: rgba(255,255,255,0.4); }
      `}</style>

      <div style={{ width: "100%", maxWidth: "480px" }}>

        {/* ── Header / Search ──────────────────────────────── */}
        <div style={{ marginBottom: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              🌍 Weather Dashboard
            </span>
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)", fontVariantNumeric: "tabular-nums" }}>
              {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              placeholder="Search city…"
              style={{
                flex: 1, background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)", borderRadius: "0.75rem",
                color: "#fff", padding: "0.6rem 1rem", fontSize: "0.9rem", outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(255,255,255,0.45)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.18)"}
            />
            <button type="submit" style={{
              background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "0.75rem", padding: "0.6rem 1rem", color: "#fff",
              cursor: "pointer", fontSize: "1rem", transition: "background 0.2s",
            }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.15)"}
            >
              🔍
            </button>
            <button
              type="button"
              onClick={() => setUnit(u => u === "C" ? "F" : "C")}
              style={{
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "0.75rem", padding: "0.6rem 0.9rem", color: "#fff",
                cursor: "pointer", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.04em",
                transition: "background 0.2s", minWidth: "3rem",
              }}
              onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
              onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.08)"}
            >
              °{unit === "C" ? "F" : "C"}
            </button>
          </form>
        </div>

        {/* ── Weather Card ─────────────────────────────────── */}
        <div style={{
          borderRadius: "1.5rem",
          background: panelBg,
          backdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: `0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)`,
          overflow: "hidden",
          minHeight: "22rem",
          transition: "background 0.8s ease",
        }}>
          {error ? (
            <ErrorCard message={error} onRetry={() => fetchWeather(query)} />
          ) : loading ? (
            <LoadingSkeleton />
          ) : weather ? (
            <div style={{ animation: "fadeSlideUp 0.5s ease both" }}>

              {/* Current conditions */}
              <div style={{ padding: "1.75rem 1.75rem 1rem" }}>
                {/* City + Date */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
                  <div>
                    <p style={{ margin: 0, fontSize: "1.3rem", fontWeight: 700, color: "#fff", lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                      {weather.city}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                      {weather.country} · {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Feels like</p>
                    <p style={{ margin: 0, fontSize: "1rem", fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
                      {displayTemp(weather.current.apparent_temperature)}
                    </p>
                  </div>
                </div>

                {/* Big temp + icon */}
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
                  <span style={{ fontSize: "4rem", lineHeight: 1 }}>{wInfo.icon}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: "3.5rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>
                      {displayTemp(weather.current.temperature_2m)}
                    </p>
                    <p style={{ margin: "0.2rem 0 0", fontSize: "0.9rem", color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>
                      {wInfo.label}
                    </p>
                  </div>
                </div>

                {/* Stats grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem" }}>
                  {[
                    { label: "Humidity", value: `${weather.current.relative_humidity_2m}%`, icon: "💧" },
                    { label: "Wind", value: `${Math.round(weather.current.wind_speed_10m)} km/h`, sub: getWindDir(weather.current.wind_direction_10m), icon: "💨" },
                    { label: "Precip.", value: `${weather.current.precipitation} mm`, icon: "🌂" },
                    { label: "Pressure", value: `${Math.round(weather.current.surface_pressure)}`, sub: "hPa", icon: "📊" },
                  ].map(({ label, value, sub, icon }) => (
                    <div key={label} style={{
                      background: "rgba(0,0,0,0.2)", borderRadius: "0.875rem",
                      padding: "0.65rem 0.6rem", textAlign: "center",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}>
                      <p style={{ margin: 0, fontSize: "1.1rem" }}>{icon}</p>
                      <p style={{ margin: "0.2rem 0 0", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
                      <p style={{ margin: "0.1rem 0 0", fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{value}</p>
                      {sub && <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(255,255,255,0.45)" }}>{sub}</p>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.1)", margin: "0 1.75rem" }} />

              {/* 7-day forecast */}
              <div style={{ padding: "1rem 1.75rem 1.75rem" }}>
                <p style={{ margin: "0 0 0.75rem", fontSize: "0.7rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                  7-Day Forecast
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                  {weather.daily.time.map((date, i) => {
                    const dayInfo = getWeatherInfo(weather.daily.weather_code[i]);
                    const isToday = i === 0;
                    return (
                      <div key={date} style={{
                        display: "flex", alignItems: "center", gap: "0.75rem",
                        padding: "0.5rem 0.75rem",
                        borderRadius: "0.75rem",
                        background: isToday ? "rgba(255,255,255,0.1)" : "transparent",
                        border: isToday ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                        transition: "background 0.15s",
                      }}>
                        <span style={{ width: "2.5rem", fontSize: "0.8rem", fontWeight: isToday ? 700 : 400, color: isToday ? "#fff" : "rgba(255,255,255,0.65)" }}>
                          {isToday ? "Today" : formatDay(date)}
                        </span>
                        <span style={{ fontSize: "1.2rem" }}>{dayInfo.icon}</span>
                        <span style={{ flex: 1, fontSize: "0.78rem", color: "rgba(255,255,255,0.6)" }}>{dayInfo.label}</span>
                        {weather.daily.precipitation_sum[i] > 0 && (
                          <span style={{ fontSize: "0.7rem", color: "#93c5fd" }}>
                            💧 {weather.daily.precipitation_sum[i].toFixed(1)}
                          </span>
                        )}
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "#fcd34d" }}>
                            {displayTemp(weather.daily.temperature_2m_max[i])}
                          </span>
                          <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.45)" }}>
                            {displayTemp(weather.daily.temperature_2m_min[i])}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div style={{ padding: "0 1.75rem 1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                  Data: Open-Meteo · Updated just now
                </p>
                <button onClick={() => fetchWeather(query)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", display: "flex", alignItems: "center", gap: "0.3rem",
                  padding: 0, transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}
                >
                  ↻ Refresh
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Quick cities */}
        <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
          {["Mumbai", "London", "Tokyo", "New York", "Sydney", "Paris"].map(city => (
            <button key={city} onClick={() => { setInputVal(city); setQuery(city); }} style={{
              background: query === city ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${query === city ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.12)"}`,
              borderRadius: "2rem", padding: "0.3rem 0.9rem", color: "#fff",
              cursor: "pointer", fontSize: "0.75rem", fontWeight: query === city ? 600 : 400,
              transition: "all 0.2s",
            }}>
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}