export function waterReach(height,x,z,target,reach=5.8){return height<=reach&&height>0&&Math.hypot(x-target.x,z-target.z)<=1.2;}
export function safeSplash(x,z,water){return !!water&&Math.hypot(x-water.x,z-water.z)<1.15;}
export function bucketPoints(center,streak){return (center?150:75)+Math.min(streak,10)*10;}
