export function getColor(id: number, stopPercent: number): string {
  const colors = [
    `linear-gradient(0deg, rgba(255,255,255,1) ${stopPercent}%, rgba(0,0,255,0.6) 100%)`,
    `linear-gradient(0deg, rgba(255,255,255,1) ${stopPercent}%, rgba(0,255,139,0.6) 100%)`,
    `linear-gradient(0deg, rgba(255,255,255,1) ${stopPercent}%, rgba(161,0,255,0.6) 100%)`,
    `linear-gradient(0deg, rgba(255,255,255,1) ${stopPercent}%, rgba(255,0,0,0.6) 100%)`,
  ]

  return colors[id % colors.length]
}
