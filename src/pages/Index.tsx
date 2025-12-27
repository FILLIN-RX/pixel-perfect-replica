import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { UpcomingSessions } from "@/components/dashboard/UpcomingSessions";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { AlertsPanel } from "@/components/dashboard/AlertsPanel";
import {
  BookOpen,
  Users,
  Building2,
  CheckCircle,
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Tableau de bord | Gestion Académique - Univ. Yaoundé I</title>
        <meta
          name="description"
          content="Système de gestion des séances de cours et TD du département d'Informatique de l'Université de Yaoundé I"
        />
      </Helmet>

      <MainLayout>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">
            Tableau de bord
          </h1>
          <p className="mt-1 text-muted-foreground">
            Vue d'ensemble des activités académiques du département
          </p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Séances aujourd'hui"
            value={24}
            subtitle="8 CM • 10 TD • 6 TP"
            icon={BookOpen}
            trend={{ value: 12, isPositive: true }}
            delay={0.1}
          />
          <StatsCard
            title="Enseignants actifs"
            value={45}
            subtitle="sur 52 inscrits"
            icon={Users}
            variant="primary"
            delay={0.15}
          />
          <StatsCard
            title="Salles occupées"
            value="18/25"
            subtitle="72% d'occupation"
            icon={Building2}
            delay={0.2}
          />
          <StatsCard
            title="Séances effectuées"
            value="89%"
            subtitle="cette semaine"
            icon={CheckCircle}
            variant="success"
            trend={{ value: 5, isPositive: true }}
            delay={0.25}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Sessions */}
          <div className="lg:col-span-2">
            <UpcomingSessions />
          </div>

          {/* Right Column - Actions & Alerts */}
          <div className="space-y-6">
            <QuickActions />
            <AlertsPanel />
          </div>
        </div>

        {/* Chart */}
        <div className="mt-6">
          <WeeklyChart />
        </div>
      </MainLayout>
    </>
  );
};

export default Index;
