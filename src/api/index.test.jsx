import { getMessage } from ".";
import axios from 'axios';

// This mocks axios so we can make it do what we want
jest.mock('axios');

describe('getMessage', () => {
  it('should return a message from /api', async () => {
  const mockResponse = {
    data: {
      message: "Test Message"
    }
  }
  axios.get.mockResolvedValueOnce(mockResponse);
  const response = await getMessage();
  expect(axios.get).toHaveBeenCalledWith('/api');
  expect(response).toEqual(mockResponse.data);
  });
});