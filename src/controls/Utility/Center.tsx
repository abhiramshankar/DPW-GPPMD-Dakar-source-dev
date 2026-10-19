interface ICenterProps {
  children: React.ReactNode;
}

export default function Center({children}: ICenterProps) {
  return (
    <div style={{height: 200, width: 300, display: "flex", alignItems: "center", justifyContent: "center"}}>
      {children}
    </div>
  )
}

