import { ImageResponse } from 'next/og'
 
// Route segment config
export const runtime = 'edge'
 
// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'
 
// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 100,
          background: 'linear-gradient(135deg, #F6F0F0 0%, #D5C7A3 50%, #BDB395 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#8B7355',
          fontWeight: 'bold',
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        B
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  )
} 