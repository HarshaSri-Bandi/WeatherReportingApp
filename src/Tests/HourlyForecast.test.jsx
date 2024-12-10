import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import HourlyForecast from '../Components/HourlyForecast';


jest.mock('axios');

describe('HourlyForecast Component', () => {
  const mockCity = 'New York';
  const mockCurrentDate = '2024-09-01';

  const mockHourlyData = {
    forecast: {
      forecastday: [
        {
          hour: [
            { condition: { icon: 'test-icon-url' }, temp_c: 25 },
            { condition: { icon: 'test-icon-url' }, temp_c: 22 },
          ]
        }
      ]
    }
  };

  const mockFiveDayData = {
    forecast: {
      forecastday: [
        { date: '2024-09-01', day: { mintemp_c: 15, maxtemp_c: 30, condition: { icon: 'test-icon-url' } } },
        { date: '2024-09-02', day: { mintemp_c: 16, maxtemp_c: 31, condition: { icon: 'test-icon-url' } } }
      ]
    }
  };

  it('renders hourly forecast and 5-day forecast', async () => {
    
    axios.get.mockImplementation((url) => {
      if (url.includes('history')) {
        return Promise.resolve({ data: mockHourlyData });
      } else if (url.includes('forecast')) {
        return Promise.resolve({ data: mockFiveDayData });
      }
    });

    // Render the component
//     render(<HourlyForecast city={mockCity} currentDate={mockCurrentDate} />);

//     // Wait for the hourly data to appear
//     await waitFor(() => expect(screen.getByText('Hourly Forecast')).toBeInTheDocument());

//     // Check if hourly data is rendered
//     expect(screen.getAllByText('25°C').length).toBeGreaterThan(0);
//     expect(screen.getAllByText('22°C').length).toBeGreaterThan(0);

//     // Check if 5-day forecast data is rendered
//     expect(screen.getByText('2024-09-01')).toBeInTheDocument();
//     expect(screen.getByText('Min : 15°C Max : 30°C')).toBeInTheDocument();
//     expect(screen.getByText('2024-09-02')).toBeInTheDocument();
//     expect(screen.getByText('Min : 16°C Max : 31°C')).toBeInTheDocument();
//   });
// });
