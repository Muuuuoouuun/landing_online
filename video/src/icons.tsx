import React from "react";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Building,
  CalendarDays,
  ChartColumn,
  Check,
  CircleCheck,
  CircleDot,
  CirclePlay,
  ClipboardCheck,
  Clock,
  CloudCheck,
  Database,
  Eye,
  FaceGrinning,
  FaceNeutral,
  FaceSlightlySmiling,
  Film,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  Hand,
  Handshake,
  Heart,
  House,
  type IconNode,
  Laptop,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  MapPin,
  Medal,
  MessageCircle,
  MessagesSquare,
  Mic,
  MicOff,
  Monitor,
  MonitorPlay,
  MonitorUp,
  Moon,
  MousePointer2,
  PenLine,
  Play,
  Presentation,
  Radar,
  RotateCcw,
  ScanLine,
  School,
  Smartphone,
  Sparkles,
  Sun,
  Timer,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
  Zap,
} from "lucide";
import { interpolate } from "remotion";
import { COLOR } from "./brand";

// lucide(ISC) 라인 아이콘. 24 그리드 · 라운드 캡 — 영상 전체가 이 한 세트만 쓴다.
export const ICONS = {
  Activity,
  ArrowRight,
  BookOpen,
  Brain,
  Briefcase,
  Building,
  CalendarDays,
  ChartColumn,
  Check,
  CircleCheck,
  CircleDot,
  CirclePlay,
  ClipboardCheck,
  Clock,
  CloudCheck,
  Database,
  Eye,
  FaceGrinning,
  FaceNeutral,
  FaceSlightlySmiling,
  Film,
  Gauge,
  Globe,
  GraduationCap,
  Grid3x3,
  Hand,
  Handshake,
  Heart,
  House,
  Laptop,
  LayoutDashboard,
  Lightbulb,
  ListChecks,
  MapPin,
  Medal,
  MessageCircle,
  MessagesSquare,
  Mic,
  MicOff,
  Monitor,
  MonitorPlay,
  MonitorUp,
  Moon,
  MousePointer2,
  PenLine,
  Play,
  Presentation,
  Radar,
  RotateCcw,
  ScanLine,
  School,
  Smartphone,
  Sparkles,
  Sun,
  Timer,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
  Video,
  VideoOff,
  Wifi,
  WifiOff,
  Zap,
} satisfies Record<string, IconNode>;

export type IconName = keyof typeof ICONS;

// progress 0→1: 획마다 순서대로 그려지는 드로우온. 1이면 완성 상태.
export const Icon: React.FC<{
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  progress?: number;
  style?: React.CSSProperties;
}> = ({ name, size = 48, color = COLOR.ink, strokeWidth = 1.75, progress = 1, style }) => {
  const node = ICONS[name];
  const n = node.length;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      {node.map(([tag, attrs], i) => {
        const start = (i / n) * 0.5;
        const p = interpolate(progress, [start, start + 0.5], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return React.createElement(tag, {
          key: i,
          ...attrs,
          pathLength: 1,
          strokeDasharray: 1,
          strokeDashoffset: 1 - p,
        });
      })}
    </svg>
  );
};
