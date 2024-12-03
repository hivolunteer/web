// ** React Imports
import { MouseEvent, useState, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Grid, { GridProps } from '@mui/material/Grid'
import { styled, useTheme } from '@mui/material/styles'


// // ** Third Party Imports
import { ApexOptions } from 'apexcharts'

// // ** Custom Components Imports
import ReactApexcharts from 'react-apexcharts'

// // ** Hook Import
// import { useSettings } from 'src/@core/hooks/useSettings'

// // ** Util Import
// import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

const yearOptions = [new Date().getFullYear() - 1, new Date().getFullYear() - 2, new Date().getFullYear() - 3]

//number of missions
const barSeries = [
  { name: 'Earning', data: [0, 0, 0, 1, 1, 3, 0, 0, 2, 3] },
]

//number of hours
const barSeries2 = [
  { name: 'Earning', data: [0, 0, 0, 4, 4, 12,0, 0, 12, 10] },
]

const lineSeries = [
  { name: 'Last Month', data: [20, 10, 30, 16, 24, 5, 30, 23, 28, 5, 30] },
  { name: 'This Month', data: [50, 40, 60, 46, 54, 35, 70, 53, 58, 35, 60] }
]

const StyledGrid = styled(Grid)<GridProps>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  [theme.breakpoints.up('sm')]: {
    borderRight: `1px solid ${theme.palette.divider}`
  }
}))

const CardWidgetsRevenueReport = () => {
  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // ** Hooks & Var
  const theme = useTheme()
 // const { settings } = useSettings()
 // const { direction } = settings

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

   const barOptions: ApexOptions = {
     chart: {
       stacked: true,
       parentHeightOffset: 0,
       toolbar: { show: false }
     },
     tooltip: { enabled: false },
     dataLabels: { enabled: false },
     stroke: {
       width: 6,
       lineCap: 'round',
       colors: [theme.palette.background.paper]
     },
     colors: ['rgba(255, 220, 100, 100)', 'rgba(255, 10, 20, 100)'],
     legend: {
       offsetY: -5,
       offsetX: -30,
       position: 'top',
       fontSize: '13px',
       horizontalAlign: 'left',
       fontFamily: theme.typography.fontFamily,
       labels: { colors: theme.palette.text.secondary },
       itemMargin: {
         vertical: 4,
         horizontal: 10
       },
       markers: {
         size: 12,
         offsetY: 1,
         offsetX: theme.direction === 'ltr' ? -4 : 5
       }
     },
     states: {
       hover: {
         filter: { type: 'none' }
       },
       active: {
         filter: { type: 'none' }
       }
     },
     plotOptions: {
       bar: {
         borderRadius: 8,
         columnWidth: '40%',
        // endingShape: 'rounded',
        // startingShape: 'rounded'
       }
     },
     grid: {
       borderColor: theme.palette.divider,
       yaxis: {
         lines: { show: false }
       },
       padding: {
         left: -15,
         right: -10,
         bottom: -12
       }
     },
     xaxis: {
       axisTicks: { show: false },
       crosshairs: { opacity: 0 },
       axisBorder: { show: false },
       categories: ['Janv', 'Févr', 'Mars', 'Avri', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct'],
       labels: {
         style: {
           colors: theme.palette.text.disabled,
           fontFamily: theme.typography.fontFamily,
           fontSize: theme.typography.body2.fontSize as string
         }
       }
     },
     yaxis: {
       labels: {
         offsetX: -15,
         style: {
           colors: theme.palette.text.disabled,
           fontFamily: theme.typography.fontFamily,
           fontSize: theme.typography.body2.fontSize as string
         }
       }
     },
     responsive: [
       {
         breakpoint: theme.breakpoints.values.xl,
         options: {
           plotOptions: {
             bar: { columnWidth: '45%' }
           }
         }
       },
       {
         breakpoint: 1380,
         options: {
           plotOptions: {
             bar: { columnWidth: '55%' }
           }
         }
       },
       {
         breakpoint: theme.breakpoints.values.md,
         options: {
           plotOptions: {
             bar: { columnWidth: '50%' }
           }
         }
       },
       {
         breakpoint: 680,
         options: {
           plotOptions: {
             bar: { columnWidth: '60%' }
           }
         }
       },
       {
         breakpoint: theme.breakpoints.values.sm,
         options: {
           plotOptions: {
             bar: { columnWidth: '50%' }
           }
         }
       },
       {
         breakpoint: 450,
         options: {
           plotOptions: {
             bar: { columnWidth: '55%' }
           }
         }
       }
     ]
  }

  const barOptions2: ApexOptions = {
    chart: {
      stacked: true,
      parentHeightOffset: 0,
      toolbar: { show: false }
    },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    stroke: {
      width: 6,
      lineCap: 'round',
      colors: [theme.palette.background.paper]
    },
    colors: ['rgba(103, 161, 145, 100)', 'rgba(103, 161, 145, 100)'],
    legend: {
      offsetY: -5,
      offsetX: -30,
      position: 'top',
      fontSize: '13px',
      horizontalAlign: 'left',
      fontFamily: theme.typography.fontFamily,
      labels: { colors: theme.palette.text.secondary },
      itemMargin: {
        vertical: 4,
        horizontal: 10
      },
      markers: {
        size: 12,
        offsetY: 1,
        offsetX: theme.direction === 'ltr' ? -4 : 5
      }
    },
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '40%',
       // endingShape: 'rounded',
       // startingShape: 'rounded'
      }
    },
    grid: {
      borderColor: theme.palette.divider,
      yaxis: {
        lines: { show: false }
      },
      padding: {
        left: -15,
        right: -10,
        bottom: -12
      }
    },
    xaxis: {
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      categories: ['Janv', 'Févr', 'Mars', 'Avri', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct'],
      labels: {
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    yaxis: {
      labels: {
        offsetX: -15,
        style: {
          colors: theme.palette.text.disabled,
          fontFamily: theme.typography.fontFamily,
          fontSize: theme.typography.body2.fontSize as string
        }
      }
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.xl,
        options: {
          plotOptions: {
            bar: { columnWidth: '45%' }
          }
        }
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.md,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 680,
        options: {
          plotOptions: {
            bar: { columnWidth: '60%' }
          }
        }
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          plotOptions: {
            bar: { columnWidth: '50%' }
          }
        }
      },
      {
        breakpoint: 450,
        options: {
          plotOptions: {
            bar: { columnWidth: '55%' }
          }
        }
      }
    ]
 }

   const lineOptions: ApexOptions = {
     chart: {
       parentHeightOffset: 0,
       toolbar: { show: false },
       sparkline: { enabled: true }
     },
     stroke: {
       width: [1, 2],
       curve: 'smooth',
       dashArray: [5, 0]
     },
     colors: [theme.palette.divider, 'rgba(10, 20, 30, 100)'],
     grid: {
       padding: { top: -5 },
       yaxis: {
         lines: { show: false }
       }
     },
     xaxis: {
       labels: { show: false },
       axisTicks: { show: false },
       axisBorder: { show: false }
     },
     yaxis: {
       labels: { show: false }
     }
    }

  return (
    <Fragment>
      <div style={{flex: 1, margin: "0 2.5%"}}>
        <Card style={{ borderRadius : '1rem'}}>
            <StyledGrid
              item
              xs={12}
              sx={{
                '& .apexcharts-series[rel="1"]': { transform: 'translateY(-6px)' },
                '& .apexcharts-series[rel="2"]': { transform: 'translateY(-9px)' }
              }}
            >
              <h4 style={{ marginLeft : '2rem', fontWeight : 450}}
              >Nombre de missions depuis le début de l'année</h4>
              <CardContent>
                <ReactApexcharts type='bar' height={200} series={barSeries} options={barOptions} />
              </CardContent>
            </StyledGrid>
        </Card>
      </div>
      <div style={{flex: 1, margin: "0 2.5%"}}>
        <Card style={{ borderRadius : '1rem'}}>
            <StyledGrid
              item
              xs={12}
              sx={{
                '& .apexcharts-series[rel="1"]': { transform: 'translateY(-6px)' },
                '& .apexcharts-series[rel="2"]': { transform: 'translateY(-9px)' }
              }}
            >
              <h4 style={{ marginLeft : '2rem', fontWeight : 450}}
              >Nombre d'heures depuis le début de l'année</h4>
              <CardContent>
                <ReactApexcharts type='bar' height={200} series={barSeries2} options={barOptions2} />
              </CardContent>
            </StyledGrid>
        </Card>
      </div>
    </Fragment>
  )
}

export default CardWidgetsRevenueReport
