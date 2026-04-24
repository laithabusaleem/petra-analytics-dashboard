import { useState } from 'react'
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import {
  IconLayoutGrid,
  IconFileText,
  IconUsers,
  IconSettings,
  IconSearch,
  IconBell,
  IconTrendUp,
  IconTrendDown,
  IconMenu,
  IconX,
} from './components/Icons.jsx'

const NAV = [
  { label: 'Dashboard', icon: IconLayoutGrid, active: true },
  { label: 'Reports', icon: IconFileText, active: false },
  { label: 'Customers', icon: IconUsers, active: false },
  { label: 'Settings', icon: IconSettings, active: false },
]

const monthlyRevenue = [
  { month: 'Jan', revenue: 29400 },
  { month: 'Feb', revenue: 32100 },
  { month: 'Mar', revenue: 30500 },
  { month: 'Apr', revenue: 35200 },
  { month: 'May', revenue: 37800 },
  { month: 'Jun', revenue: 36200 },
  { month: 'Jul', revenue: 39100 },
  { month: 'Aug', revenue: 41200 },
  { month: 'Sep', revenue: 38900 },
  { month: 'Oct', revenue: 43500 },
  { month: 'Nov', revenue: 46200 },
  { month: 'Dec', revenue: 48200 },
]

const weeklySignups = [
  { day: 'Mon', signups: 52 },
  { day: 'Tue', signups: 38 },
  { day: 'Wed', signups: 64 },
  { day: 'Thu', signups: 45 },
  { day: 'Fri', signups: 58 },
  { day: 'Sat', signups: 32 },
  { day: 'Sun', signups: 18 },
]

const trafficSources = [
  { name: 'Organic', value: 45, color: '#059669' },
  { name: 'Paid', value: 30, color: '#2563eb' },
  { name: 'Referral', value: 15, color: '#d97706' },
  { name: 'Direct', value: 10, color: '#475569' },
]

const transactions = [
  { id: 1, customer: 'Sarah Chen', product: 'Pro Annual', amount: 1188, date: 'Apr 25, 2026', status: 'success' },
  { id: 2, customer: 'Marcus Webb', product: 'Team Plan', amount: 499, date: 'Apr 25, 2026', status: 'success' },
  { id: 3, customer: 'Elena Voss', product: 'Add-on: API', amount: 99, date: 'Apr 24, 2026', status: 'pending' },
  { id: 4, customer: 'James Okafor', product: 'Pro Monthly', amount: 99, date: 'Apr 24, 2026', status: 'success' },
  { id: 5, customer: 'Lina Park', product: 'Team Plan', amount: 499, date: 'Apr 24, 2026', status: 'failed' },
  { id: 6, customer: 'Oliver Grant', product: 'Enterprise', amount: 2400, date: 'Apr 23, 2026', status: 'success' },
  { id: 7, customer: 'Nina Ibarra', product: 'Pro Annual', amount: 1188, date: 'Apr 23, 2026', status: 'pending' },
  { id: 8, customer: 'Theo Blackwood', product: 'Pro Monthly', amount: 99, date: 'Apr 22, 2026', status: 'success' },
]

const topCustomers = [
  { name: 'Northwind Systems', mrr: 4200, growth: 12.4, abbr: 'NS', color: 'from-sky-500 to-blue-600' },
  { name: 'Aperture Labs', mrr: 3100, growth: 8.1, abbr: 'AL', color: 'from-violet-500 to-purple-600' },
  { name: 'Blue River Finance', mrr: 2800, growth: 15.0, abbr: 'BR', color: 'from-emerald-500 to-teal-600' },
  { name: 'Cedar Health Co.', mrr: 1950, growth: 4.2, abbr: 'CH', color: 'from-amber-500 to-orange-500' },
  { name: 'Voltline Energy', mrr: 1680, growth: 22.6, abbr: 'VE', color: 'from-rose-500 to-pink-600' },
]

function formatMoney(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
}

function KpiCard({ label, value, subValue, trend, trendLabel, isPositive }) {
  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-200 hover:shadow-md">
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums tracking-tight text-slate-900 sm:text-3xl">{value}</p>
      <div
        className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${
          isPositive ? 'text-emerald-600' : 'text-rose-600'
        }`}
      >
        {trend === 'up' ? (
          <IconTrendUp className="h-4 w-4 transition-transform group-hover:translate-y-[-1px]" />
        ) : (
          <IconTrendDown className="h-4 w-4 transition-transform group-hover:translate-y-[1px]" />
        )}
        <span className="tabular-nums">{subValue}</span>
        <span className="font-normal text-slate-500">{trendLabel}</span>
      </div>
    </div>
  )
}

function statusBadge(status) {
  const map = {
    success: { label: 'Completed', className: 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200/60' },
    failed: { label: 'Failed', className: 'bg-rose-50 text-rose-700 ring-1 ring-rose-200/60' },
    pending: { label: 'Pending', className: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200/60' },
  }
  const s = map[status]
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${s.className}`}>{s.label}</span>
}

const chartTooltipStyle = {
  backgroundColor: 'rgba(255,255,255,0.95)',
  border: '1px solid rgb(226 232 240)',
  borderRadius: '12px',
  fontSize: '12px',
  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)',
}

function SidebarContent({ onNavigate }) {
  return (
    <>
      <div className="flex items-center gap-3 px-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white shadow-lg shadow-indigo-900/30">
          P
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Petra</p>
          <p className="text-xs text-slate-400">Analytics</p>
        </div>
      </div>
      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {NAV.map((item) => {
          const Icon = item.icon
          return (
            <button
              type="button"
              key={item.label}
              onClick={onNavigate}
              className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${
                  item.active ? 'text-blue-300' : 'text-slate-400 group-hover:text-slate-200'
                }`}
              />
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="mt-auto rounded-xl border border-slate-700/80 bg-slate-800/50 p-4">
        <p className="text-xs font-medium text-slate-300">Pro tip</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-400">
          Export a branded PDF report for stakeholders from the Reports tab.
        </p>
        <button
          type="button"
          onClick={onNavigate}
          className="mt-3 w-full rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:from-blue-400 hover:to-indigo-400 hover:shadow-md"
        >
          Open Reports
        </button>
      </div>
    </>
  )
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Desktop sidebar */}
        <aside
          className="hidden w-64 flex-shrink-0 flex-col border-r border-slate-800/50 p-6 md:flex"
          style={{ backgroundColor: '#0F172A' }}
        >
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </aside>

        {/* Mobile sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col p-6 pt-5 shadow-2xl transition-transform duration-300 ease-out md:hidden ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          style={{ backgroundColor: '#0F172A' }}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close menu"
          >
            <IconX className="h-5 w-5" />
          </button>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-md sm:px-6">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileOpen(true)}
                  className="rounded-lg p-2 text-slate-600 transition-all hover:bg-slate-100 md:hidden"
                  aria-label="Open menu"
                >
                  <IconMenu className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-lg font-semibold tracking-tight text-slate-900">Dashboard</h1>
                  <p className="hidden text-sm text-slate-500 sm:block">Welcome back — here is what changed today.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="relative hidden min-w-0 sm:block sm:max-w-xs lg:max-w-md">
                  <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    placeholder="Search…"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-slate-800 shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
                  />
                </div>
                <button
                  type="button"
                  className="relative rounded-xl p-2.5 text-slate-500 transition-all hover:bg-slate-100 hover:text-slate-800"
                  aria-label="Notifications"
                >
                  <IconBell className="h-5 w-5" />
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white" />
                </button>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-slate-200 to-slate-300 text-xs font-bold text-slate-700 ring-2 ring-white shadow-sm transition-transform hover:scale-105"
                  aria-label="Account"
                >
                  AP
                </button>
              </div>
            </div>
            <div className="mt-3 sm:hidden">
              <div className="relative">
                <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder="Search…"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2 pl-9 pr-3 text-sm text-slate-800 shadow-inner outline-none transition-all placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>
          </header>

          <main className="flex-1 space-y-6 p-4 sm:space-y-8 sm:p-6 lg:p-8">
            {/* KPIs */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                label="Revenue"
                value={formatMoney(48200)}
                subValue="+12.3%"
                trend="up"
                trendLabel="vs last month"
                isPositive
              />
              <KpiCard
                label="New users"
                value="1,840"
                subValue="+8.1%"
                trend="up"
                trendLabel="vs last month"
                isPositive
              />
              <KpiCard
                label="Churn rate"
                value="2.4%"
                subValue="−0.3%"
                trend="down"
                trendLabel="vs last month"
                isPositive
              />
              <KpiCard
                label="Active sessions"
                value="312"
                subValue="+4.2%"
                trend="up"
                trendLabel="vs last month"
                isPositive
              />
            </section>

            {/* Charts row 1 */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-slate-900">Revenue</h2>
                      <p className="text-sm text-slate-500">Trailing twelve months (USD)</p>
                    </div>
                    <p className="text-sm text-emerald-600">YTD {formatMoney(435300)}</p>
                  </div>
                  <div className="mt-6 h-64 w-full sm:h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyRevenue} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                        <YAxis
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip
                          contentStyle={chartTooltipStyle}
                          formatter={(v) => [formatMoney(v), 'Revenue']}
                          labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#2563eb"
                          strokeWidth={2.5}
                          dot={{ r: 3, fill: '#2563eb' }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-full rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
                  <h2 className="text-base font-semibold text-slate-900">Traffic sources</h2>
                  <p className="text-sm text-slate-500">Share of sessions (last 30 days)</p>
                  <div className="mt-2 flex h-48 flex-col items-stretch sm:h-56">
                    <div className="min-h-0 flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={trafficSources}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius="56%"
                            outerRadius="80%"
                            paddingAngle={3}
                            stroke="none"
                          >
                            {trafficSources.map((entry) => (
                              <Cell key={entry.name} fill={entry.color} className="outline-none" />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={chartTooltipStyle}
                            formatter={(v) => [`${v}%`, '']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <ul className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-xs sm:text-sm">
                      {trafficSources.map((s) => (
                        <li key={s.name} className="flex items-center gap-1.5 text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: s.color }} />
                          {s.name} {s.value}%
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Bar chart full width or half */}
            <section className="grid grid-cols-1">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">Signups this week</h2>
                    <p className="text-sm text-slate-500">New user registrations by day</p>
                  </div>
                  <p className="text-sm font-medium text-slate-600">Total 307</p>
                </div>
                <div className="mt-6 h-56 w-full sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weeklySignups} margin={{ top: 4, right: 8, left: 0, bottom: 0 }} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12, fill: '#64748b' }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip
                        contentStyle={chartTooltipStyle}
                        formatter={(v) => [v, 'Signups']}
                        labelStyle={{ color: '#0f172a', fontWeight: 600 }}
                      />
                      <Bar dataKey="signups" radius={[8, 8, 0, 0]}>
                        {weeklySignups.map((_, i) => (
                          <Cell
                            key={i}
                            fill={i % 2 === 0 ? '#3b82f6' : '#60a5fa'}
                            className="transition-all duration-200 hover:opacity-80"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>

            {/* Table + top customers */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md xl:col-span-3">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <h2 className="text-base font-semibold text-slate-900">Recent transactions</h2>
                  <p className="text-sm text-slate-500">Latest payments across your workspace</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-sm">
                    <thead>
                      <tr className="bg-slate-50/80 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        <th className="px-5 py-3 sm:px-6">Customer</th>
                        <th className="px-2 py-3">Product</th>
                        <th className="px-2 py-3">Amount</th>
                        <th className="hidden py-3 md:table-cell">Date</th>
                        <th className="px-5 py-3 text-right sm:px-6">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {transactions.map((t) => (
                        <tr
                          key={t.id}
                          className="group transition-colors hover:bg-slate-50/80"
                        >
                          <td className="px-5 py-3.5 font-medium text-slate-900 sm:px-6">{t.customer}</td>
                          <td className="px-2 py-3.5 text-slate-600">{t.product}</td>
                          <td className="px-2 py-3.5 tabular-nums text-slate-900">{formatMoney(t.amount)}</td>
                          <td className="hidden py-3.5 text-slate-500 md:table-cell">{t.date}</td>
                          <td className="px-5 py-3.5 text-right sm:px-6">{statusBadge(t.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-6 xl:col-span-2">
                <h2 className="text-base font-semibold text-slate-900">Top customers</h2>
                <p className="text-sm text-slate-500">By MRR (monthly)</p>
                <ul className="mt-5 space-y-4">
                  {topCustomers.map((c) => (
                    <li key={c.name}>
                      <div className="group flex items-center justify-between gap-3 rounded-xl border border-transparent p-1 transition-all hover:border-slate-100 hover:bg-slate-50/80">
                        <div className="flex min-w-0 items-center gap-3">
                          <div
                            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white shadow-sm ${c.color}`}
                          >
                            {c.abbr}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-900 transition-colors group-hover:text-blue-700">
                              {c.name}
                            </p>
                            <p className="text-sm text-slate-500">{formatMoney(c.mrr)} MRR</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-emerald-600 tabular-nums">+{c.growth}%</p>
                          <p className="text-xs text-slate-400">MoM</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="mt-6 w-full rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  View all customers
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
