import DOMPurify from 'isomorphic-dompurify';
import { JSDOM } from 'jsdom';

export async function POST(request) {
  try {
    const { essay } = await request.json()

    if (!essay) {
      return new Response('Essay is required', { status: 400 })
    }

    if (essay.length > 7000) {
      return new Response('Essay is too long. Please limit to 7000 characters.', { status: 400 });
    }

    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const sanitizedEssay = purify.sanitize(essay);

    const prompt = `You are a Gen Z college admissions officer who loves to roast college essays in a funny but helpful way. 
    Analyze this college essay and provide a response in the following JSON format (do not include markdown formatting or code blocks):
    {
      "roast": "Your sarcastic but constructive roast (2-3 sentences)",
      "admissionChance": number between 0 and 100 be brutally honest here,
      "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3"],
      "verdict": "Your one-liner verdict"
    }
    
    Essay: ${sanitizedEssay}`

    const response = await fetch('https://ai.hackclub.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are a Gen Z college admissions officer who loves to roast college essays in a funny but helpful way. Keep your responses concise and entertaining. Use emojis and Gen Z slang where appropriate. IMPORTANT: Respond with pure JSON only, no markdown formatting, no code blocks, no additional text. The response must be a valid JSON object with roast, admissionChance, suggestions, and verdict fields.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('AI Service Error:', errorData)
      throw new Error(`Failed to get roast: ${errorData.error?.message || 'Unknown error'}`)
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    try {
      // Clean the response content by removing any markdown formatting
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim()
      const parsedResponse = JSON.parse(cleanContent)
      
      // Validate the response structure
      if (!parsedResponse.roast || !parsedResponse.admissionChance || !parsedResponse.suggestions || !parsedResponse.verdict) {
        throw new Error('Invalid response structure from AI')
      }

      return new Response(JSON.stringify(parsedResponse), {
        headers: { 'Content-Type': 'application/json' },
      })
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError)
      console.error('Raw Content:', content)
      throw new Error('Failed to parse AI response. Please try again.')
    }
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Internal Server Error',
      details: error.stack
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
} 
                                                                                                                                                                                                           
