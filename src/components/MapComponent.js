import React from "react"
import { Map, Marker } from "pigeon-maps"

export default function MapComponent({post}) {
  return (
    <Map height="100%" defaultCenter={[Number(post.latitude), Number(post.longitude)]} defaultZoom={13}>
      <Marker color="#1877f2" width={30} anchor={[Number(post.latitude), Number(post.longitude)]} />
    </Map>
  )
}