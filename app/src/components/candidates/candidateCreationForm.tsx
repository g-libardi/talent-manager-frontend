import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import TagInput from '../ui/tag_input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import useCandidates from '@/hooks/useCandidates';


const formSchema = z.object({
  first_name: z.string().min(1, { message: 'First name is required' }),
  last_name: z.string().min(1, { message: 'Last name is required' }),
  birth_date: z.coerce.date().max(new Date(), { message: 'Birth date must be in the past' }),
  skills: z.array(z.string()).nonempty({ message: 'At least one skill is required' }),
  status: z.enum(['APPLIED', 'REJECTED', 'INVITED', 'HIRED'])
});


const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(date.getDate() + 1).padStart(2, '0');

  return `${year}-${month}-${day}`;
};


async function handleSubmit(data: z.infer<typeof formSchema>) {
  const reqData = { ...data, skills: data.skills.join(','), birth_date: formatDate(data.birth_date) };
  await useCandidates().create(reqData);
}


export default function CandidateCreationForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      birth_date: new Date(),
      skills: [],
      status: 'APPLIED',
    },
  });


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        
        <div className="flex justify-between gap-4">
          {/* First Name Field */}
          <FormField 
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input placeholder="First name" {...field} className="w-full"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Last Name Field */}
          <FormField 
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input placeholder="Last name" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>


        <div className="flex justify-between gap-4">
        {/* Birth Date Field */}
        <FormField 
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Birth date</FormLabel>
              <FormControl>
                <Input type="date" 
                  {...field}
                  value={
                      field.value instanceof Date
                        ? field.value.toISOString().split('T')[0]
                        : field.value
                    }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* Status Field */}
        <FormField 
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="APPLIED">Applied</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                  <SelectItem value="INVITED">Invited</SelectItem>
                  <SelectItem value="HIRED">Hired</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        </div>

      
        {/* Skills Field */}
        <FormField 
          control={form.control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skills</FormLabel>
              <FormControl>
                <TagInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full">Save</Button>
      </form>
    </Form>
  )
}
